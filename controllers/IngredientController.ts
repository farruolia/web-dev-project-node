/**
 * @file Controller RESTful Web service API for ingredient resource
 */
import IngredientDao from "../daos/IngredientDao";
import {Express, Request, Response} from "express";

/**
 * @class IngredientController Implements RESTful Web service API for ingredient resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/ingredients to create a new ingredient instance</li>
 *     <li>GET /api/ingredients to retrieve all ingredients by that name</li>
 * </ul>
 * @property {IngredientDao} ingredientDao Singleton DAO implementing ingredients CRUD operations
 * @property {IngredientController} ingredientController Singleton controller implementing
 * RESTful Web service API
 */
export default class IngredientController {

    private static ingredientDao: IngredientDao = IngredientDao.getInstance();
    private static ingredientController: IngredientController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return IngredientController
     */
    public static getInstance = (app: Express): IngredientController => {
        if (IngredientController.ingredientController === null) {
            IngredientController.ingredientController = new IngredientController();

            app.post('/api/ingredients', IngredientController.ingredientController.createIngredient);
            app.get('/api/ingredients', IngredientController.ingredientController.findIngredientsByName);
        }
        return IngredientController.ingredientController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new ingredient to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new ingredient that was inserted in the
     * database
     */
    createIngredient = (req: Request, res: Response) => {
        try {
            return IngredientController.ingredientDao.createIngredient(req.body)
                .then((ingredient) => res.json(ingredient));
        }
        catch (e) {
            res.status(403).json({ error: e });
        }
    }

    /**
     * Retrieves all ingredients from the database of that name
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the ingredient objects
     */
    findIngredientsByName = (req: Request, res: Response) => {
        try {
            if (!req.query.name || !req.query.name.toString().length) {
                res.send([])
                return
            }
            const name = req.query.name.toString();
            return IngredientController.ingredientDao.findIngredientsByName(name)
                .then((ingredient) => res.json(ingredient));
        }
        catch (e) {
            res.status(403).json({ error: e });
        }
    }
}