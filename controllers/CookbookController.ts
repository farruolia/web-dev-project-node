/**
 * @file Controller RESTful Web service API for cookbook resource
 */
import CookbookDao from "../daos/CookbookDao";
import {Express, Request, Response} from "express";
import Recipe from "../models/recipes/Recipe";

/**
 * @class CookbookController Implements RESTful Web service API for cookbooks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/cookbook/:rid/users/:uid to record that a user bookmarks a recipe
 *     </li>
 *     <li>DELETE /api/cookbook/:tid/users/:uid to record that a user no longer bookmarks a recipe
 *     </li>
 *     <li>GET /api/cookbook/users/:uid to retrieve all the recipes bookmarked by the user
 *     </li>
 * </ul>
 * @property {CookbookDao} cookbookDao Singleton DAO implementing cookbook CRUD operations
 * @property {CookBookController} cookbookController Singleton controller implementing
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
        }
        return CookbookController.cookbookController;
    }

    private constructor() {}

    /**
     * Uses CookbookModel to insert cookbook into database
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
}