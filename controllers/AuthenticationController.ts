import UserDao from "../daos/UserDao";
import {Express} from "express";

/**
 * @file Declares controller that can talk to the front-end services for Authentication and also talk to the DAOs for
 * login, signup, profile and login
 */
export default class AuthenticationController {

    private static userDao: UserDao  = UserDao.getInstance();
    private static authenticationController: AuthenticationController | null = null;

    public static getInstance = (app: Express): AuthenticationController => {
        if (AuthenticationController.authenticationController == null) {
            AuthenticationController.authenticationController = new AuthenticationController();
            app.post("/api/auth/signup", AuthenticationController.authenticationController.signup);
            app.post("/api/auth/login", AuthenticationController.authenticationController.login);
            app.get("/api/auth/profile", AuthenticationController.authenticationController.profile);
            app.post("/api/auth/logout", AuthenticationController.authenticationController.logout);
        }
        return AuthenticationController.authenticationController;
    }

    private constructor() {}

    signup = async (req: any, res: any) => {
        console.log("HERE")
        const newUser = req.body;

        const existingUser = await AuthenticationController.userDao.findUserByEmail(req.body.email);
        if (existingUser) {
            res.sendStatus(403);
            return;
        }
        else {
            const insertedUser = await AuthenticationController.userDao.createUser(newUser);
            insertedUser.password = '';
            req.session['profile'] = insertedUser;
            await res.json(insertedUser);
        }
    }

    profile = (req: any, res: any) => {
        const profile = req.session['profile'];
        if (profile) {
            profile.password = "";
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    logout = (req: any, res: any) => {
        req.session.destroy();
        res.sendStatus(200);
    }

    login = async (req: any, res: any) => {
        try {
            const user = req.body;
            const email = user.email;
            const password = user.password;
            const existingUser = await AuthenticationController.userDao.findUserByCredentials(email, password);
            if (!existingUser) {
                res.sendStatus(403);
                return;
            } else {
                existingUser.password = '*****';
                req.session['profile'] = existingUser;
                res.json(existingUser);
            }
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }

    };
}
