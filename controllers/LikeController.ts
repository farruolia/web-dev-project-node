/**
 * @file Controller RESTful Web service API for likes resource
 */
import LikeDao from "../daos/LikeDao";
import {Express} from "express";

/**
 * @class LikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/likes/:rid/users/:uid to record that a user likes a recipe
 *     </li>
 *     <li>DELETE /api/likes/:rid/users/:uid to record that a user no longer likes a recipe
 *     </li>
 *     <li>GET /api/likes/users/:uid to retrieve all the recipes liked by the user
 *     </li>
 *     <li>GET /api/likes/:rid/users to retrieve all the users that like a recipe
 *     </li>
 *     <li>GET /api/likes/:rid/users/:uid to retrieve whether user has liked a recipe or not
 *     </li>
 * </ul>
 * @property {CookbookDao} cookbookDao Singleton DAO implementing cookbook CRUD operations
 * @property {CookbookController} cookbookController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController {

    private static likeDao: LikeDao = LikeDao.getInstance()
    private static likeController: LikeController | null = null

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return LikeController
     */
    public static getInstance = (app: Express): LikeController => {

        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.post('/api/likes/:rid/users/:uid',LikeController.likeController.userLikesRecipe);
            app.delete('/api/likes/:rid/users/:uid', LikeController.likeController.userUnlikesRecipe);
            app.get('/api/likes/users/:uid', LikeController.likeController.findRecipesLikedByUser);
            app.get('/api/likes/:rid/users', LikeController.likeController.findUsersThatLikedRecipe);
            app.get('/api/likes/:rid/users/:uid', LikeController.likeController.isLikedByUser);

        }
        return LikeController.likeController;
    }

    /**
     * Uses LikeModel to insert like into database
     * @param {Request} req Represents HTTP request, including the
     * path parameters rid and uid representing the recipe liked by the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new like that was inserted in the
     * database
     */
    userLikesRecipe = (req: any, res: any) => {
        try {
            let userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
            return LikeController.likeDao.userLikesRecipe(req.params.rid, userId)
                .then(likes => res.send(likes));
        }
        catch (e) {
            res.status(403).json({ error: e });
        }
    }

    /**
     * Uses LikeModel to remove like from database
     * @param {Request} req Represents HTTP request, including the
     * path parameters rid and uid representing the recipe that is un-liked by the user
     * @param {Response} res Represents HTTP response, including status
     * on whether un-liking the recipe was successful or not
     */
    userUnlikesRecipe = (req: any, res: any) => {
        try {
            let userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
            return LikeController.likeDao.userUnlikesRecipe(req.params.rid, userId)
                .then(status => res.send(status));
        }
        catch (e) {
            res.status(403).json({ error: e });
        }
    }

    /**
     * Uses LikeModel to retrieve a list of recipes liked by a user
     * @param {Request} req Represents HTTP request, including the path parameter uid representing the user
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the recipe objects
     */
    findRecipesLikedByUser = (req: any, res: any) => {
        try {
            let userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
            return LikeController.likeDao.findRecipesLikedByUser(userId)
                .then(recipes => res.send(recipes));
        }
        catch (e) {
            res.status(403).json({ error: e });
        }
    }

    /**
     * Uses LikeModel to retrieve a list of users that liked a recipe
     * @param {Request} req Represents HTTP request, including the path parameter rid representing the recipe
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the user objects
     */
    findUsersThatLikedRecipe = (req: any, res: any) => {
        try {
            return LikeController.likeDao.findUsersThatLikedRecipe(req.params.rid)
                .then(users => res.send(users));
        }
        catch (e) {
            res.status(403).json({ error: e });
        }
    }

    /**
     * Uses LikeModel to retrieve a whether user has liked a recipe or not
     * @param {Request} req Represents HTTP request, including the path parameter rid representing the recipe
     * @param {Response} res Represents HTTP response, including the
     * body formatted as boolean
     */
    isLikedByUser = async (req: any, res: any) => {
        try {
            let userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
            const response = await LikeController.likeDao.isLikedByUser(req.params.rid, userId)
            if (response) {
                return res.send(true)
            }
            return res.send(false)

        }
        catch (e) {
            res.status(403).json({ error: e });
        }
    }



}