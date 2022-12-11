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
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import RecipeController from "./controllers/RecipeController";
import AuthenticationController from "./controllers/AuthenticationController";
require('dotenv').config({debug: true});

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
    }}

// build the connection string
const PROTOCOL="mongodb+srv";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.HOST}/${process.env.DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString, options).then(r => "");

const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session(sess));

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

/**
 * create RESTful Web service API
 */
UserController.getInstance(app);
RecipeController.getInstance(app);
AuthenticationController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);