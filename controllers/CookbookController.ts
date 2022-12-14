/**
 * @file Controller RESTful Web service API for cookbook resource
 */
import CookbookDao from "../daos/CookbookDao";
import {Express, Request, Response} from "express";

/**
 * @class CookbookController Implements RESTful Web service API for cookbooks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/cookbook/:rid/users/:uid to record that a user bookmarks a recipe
 *     </li>
 *     <li>DELETE /api/cookbook/:rid/users/:uid to record that a user no longer bookmarks a recipe
 *     </li>
 *     <li>GET /api/cookbook/users/:uid to retrieve all the recipes bookmarked by the user
 *     </li>
 *     <li>GET /api/cookbook/:rid/users/:uid to retrieve whether user has bookmarked a recipe or not
 *     </li>
 * </ul>
 * @property {CookbookDao} cookbookDao Singleton DAO implementing cookbook CRUD operations
 * @property {CookbookController} cookbookController Singleton controller implementing
 * RESTful Web service API
 */
export default class CookbookController {

    private static cookBookDao: CookbookDao = CookbookDao.getInstance();
    private static cookbookController: CookbookController | null = null

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return CookbookController
     */
    public static getInstance = (app: Express): CookbookController => {

        if (CookbookController.cookbookController === null) {
            CookbookController.cookbookController = new CookbookController();
            app.post('/api/cookbook/:rid/users/:uid', CookbookController.cookbookController.userBookmarksRecipe);
            app.delete('/api/cookbook/:rid/users/:uid', CookbookController.cookbookController.userUnbookmarksRecipe);
            app.get('/api/cookbook/users/:uid', CookbookController.cookbookController.findRecipesBookmarkedByUser);
            app.get('/api/cookbook/:rid/users/:uid', CookbookController.cookbookController.isBookmarkedByUser)
        }
        return CookbookController.cookbookController;
    }

    private constructor() {}

    /**
     * Uses CookbookModel to insert bookmark into database
     * @param {Request} req Represents HTTP request, including the
     * path parameters rid and uid representing the recipe bookmarked by the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    userBookmarksRecipe = (req: any, res: any) => {
        try {
            let userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
            return CookbookController.cookBookDao.userBookmarksRecipe(req.params.rid, userId)
                .then(bookmarks => res.json(bookmarks));
        }
        catch (e) {
            res.status(403).json({ error: e });
        }
    }

    /**
     * Uses CookbookModel to remove bookmark from database
     * @param {Request} req Represents HTTP request, including the
     * path parameters rid and uid representing the recipe that is un-bookmarked by the user
     * @param {Response} res Represents HTTP response, including status
     * on whether un-bookmarking the recipe was successful or not
     */
    userUnbookmarksRecipe = (req: any, res: any) => {
        try {
            let userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
            return CookbookController.cookBookDao.userUnbookmarksRecipe(req.params.rid, userId)
                .then(status => res.send(status));
        }
        catch (e) {
            res.status(403).json({ error: e });
        }
    }

    /**
     * Uses CookbookModel to retrieve a list of recipes bookmarked by a user
     * @param {Request} req Represents HTTP request, including the path parameter uid representing the user
     * @param {Response} res Represents HTTP response, including the
     * body formatted as JSON arrays containing the cookbook objects
     */
    findRecipesBookmarkedByUser = (req: any, res: any) => {
        try {
            let userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
            return CookbookController.cookBookDao.findRecipesBookmarkedByUser(userId)
                .then(status => res.send(status));
        }
        catch (e) {
            res.status(403).json({ error: e });
        }
    }

    /**
     * Uses CookbookModel to retrieve a whether user has bookmarked a recipe or not
     * @param {Request} req Represents HTTP request, including the path parameter rid representing the recipe bookmarked
     * @param {Response} res Represents HTTP response, including the
     * body formatted as boolean
     */
    isBookmarkedByUser = async (req: any, res: any) => {
        try {
            let userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
            const response = await CookbookController.cookBookDao.isBookmarkedByUser(req.params.rid, userId)
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