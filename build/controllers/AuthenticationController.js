"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * @file Declares controller that can talk to the front-end services for Authentication and also talk to the DAOs for
 * login, signup, profile and login
 */
class AuthenticationController {
    constructor() {
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            const password = newUser.password;
            newUser.password = yield bcrypt.hash(password, saltRounds);
            const existingUser = yield AuthenticationController.userDao.findUserByEmail(req.body.email);
            if (existingUser) {
                res.sendStatus(403);
                return;
            }
            else {
                const insertedUser = yield AuthenticationController.userDao.createUser(newUser);
                insertedUser.password = '';
                req.session['profile'] = insertedUser;
                yield res.json(insertedUser);
            }
        });
        this.profile = (req, res) => {
            const profile = req.session['profile'];
            if (profile) {
                profile.password = "";
                res.json(profile);
            }
            else {
                res.sendStatus(403);
            }
        };
        this.logout = (req, res) => {
            req.session.destroy();
            res.sendStatus(200);
        };
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const email = user.email;
                const password = user.password;
                const existingUser = yield AuthenticationController.userDao.findUserByEmail(email);
                if (!existingUser) {
                    res.sendStatus(403);
                    return;
                }
                const match = yield bcrypt.compare(password, existingUser.password);
                if (match) {
                    existingUser.password = '*****';
                    req.session['profile'] = existingUser;
                    res.json(existingUser);
                }
                else {
                    res.sendStatus(403);
                }
            }
            catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        });
    }
}
exports.default = AuthenticationController;
AuthenticationController.userDao = UserDao_1.default.getInstance();
AuthenticationController.authenticationController = null;
AuthenticationController.getInstance = (app) => {
    if (AuthenticationController.authenticationController == null) {
        AuthenticationController.authenticationController = new AuthenticationController();
        app.post("/api/auth/signup", AuthenticationController.authenticationController.signup);
        app.post("/api/auth/login", AuthenticationController.authenticationController.login);
        app.post("/api/auth/profile", AuthenticationController.authenticationController.profile);
        app.post("/api/auth/logout", AuthenticationController.authenticationController.logout);
    }
    return AuthenticationController.authenticationController;
};
