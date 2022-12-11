"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>posts</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>comments</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const RecipeController_1 = __importDefault(require("./controllers/RecipeController"));
const AuthenticationController_1 = __importDefault(require("./controllers/AuthenticationController"));
require('dotenv').config({ debug: true });
const cors = require("cors");
const session = require("express-session");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
};
let sess = {
    secret: "Secret",
    cookie: {
        secure: false
    }
};
// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.HOST}/${process.env.DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose_1.default.connect(connectionString, options).then(r => "");
const app = (0, express_1.default)();
app.use(cors({ credentials: true, origin: true }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(session(sess));
app.get('/', (req, res) => res.send('Welcome!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));
/**
 * create RESTful Web service API
 */
UserController_1.default.getInstance(app);
RecipeController_1.default.getInstance(app);
AuthenticationController_1.default.getInstance(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
