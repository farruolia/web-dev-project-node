/**
 * @file Controller RESTful Web service API for recipe resource
 */
import RecipeDao from "../daos/RecipeDao";
import {Express, Request, Response} from "express";
import Recipe from "../models/recipes/Recipe";

/**
 * @class RecipeController Implements RESTful Web service API for recipe resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/recipes to create a new recipe instance for
 *     a given user</li>
 *     <li>PUT /api/recipes/:rid to modify an individual recipe instance</li>
 *     <li>DELETE /api/recipes/:rid to remove a particular recipe instance</li>
 *     <li>GET /api/recipes/:rid to retrieve a particular recipe instance</li>
 *     <li>GET /api/users/:uid/recipes to retrieve recipes for a given user</li>
 *     <li>GET /api/dishes/:did/recipes to retrieve recipes for a particular dish</li>
 *     <li>GET /api/recipes/random to retrieve 5 random recipes for the home page</li>
 *     <li>GET /api/recipes to retrieve all the recipes</li>
 * </ul>
 * @property {RecipeDao} recipeDao Singleton DAO implementing recipe CRUD operations
 * @property {RecipeController} recipeController Singleton controller implementing
 * RESTful Web service API
 */
export default class RecipeController {

    private static recipeDao: RecipeDao = RecipeDao.getInstance();
    private static recipeController: RecipeController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return RecipeController
     */
    public static getInstance = (app: Express): RecipeController => {
        if (RecipeController.recipeController === null) {
            RecipeController.recipeController = new RecipeController();

            app.post("/api/users/:uid/recipes", RecipeController.recipeController.createRecipe);
            app.put("/api/recipes/:rid", RecipeController.recipeController.updateRecipe);
            app.delete("/api/recipes/:rid", RecipeController.recipeController.deleteRecipe);
            app.get("/api/recipes/:rid", RecipeController.recipeController.findRecipeById);
            app.get("/api/users/:uid/recipes", RecipeController.recipeController.findAllRecipesByUser);
            app.get("/api/dishes/:did/recipes", RecipeController.recipeController.findRecipeByDishId);
            //app.get("/api/recipes/random", RecipeController.recipeController.findRandomRecipes);
            app.get("/api/recipes", RecipeController.recipeController.findAllRecipes);
        }
        return RecipeController.recipeController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new recipe to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new recipe that was inserted in the
     * database
     */
    createRecipe = (req: Request, res: Response) => {
        RecipeController.recipeDao.createRecipe(req.params.uid, req.body)
            .then((recipe: Recipe) => res.json(recipe));
    }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter rid identifying the primary key of the recipe to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a recipe was successful or not
     */
    updateRecipe = (req: Request, res: Response) =>
        RecipeController.recipeDao.updateRecipe(req.params.rid, req.body)
            .then((status) => res.send(status));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter rid identifying the primary key of the recipe to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a recipe was successful or not
     */
    deleteRecipe = (req: Request, res: Response) =>
        RecipeController.recipeDao.deleteRecipe(req.params.rid)
            .then((status) => res.send(status));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter rid identifying the primary key of the recipe to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the recipe
     */
    findRecipeById = (req: Request, res: Response) =>
        RecipeController.recipeDao.findRecipeById(req.params.rid)
            .then((recipe: Recipe) => res.json(recipe));

    /**
     * Retrieves all recipes from the database for a particular user and returns
     * an array of recipes.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the recipe objects
     */
    findAllRecipesByUser = (req: Request, res: Response) =>
        RecipeController.recipeDao.findAllRecipesByUser(req.params.uid)
            .then((recipes: Recipe[]) => res.json(recipes));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter did identifying the primary key of the dish whose recipes are to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the recipes
     */
    findRecipeByDishId = (req: Request, res: Response) =>
        RecipeController.recipeDao.findRecipeByDishId(req.params.did)
            .then((recipes: Recipe[]) => res.json(recipes));

    /**
     * Retrieves 5 random recipes from the database and returns
     * an array of recipes.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client
     */
    findRandomRecipes = (req: Request, res: Response) =>
        RecipeController.recipeDao.findRandomRecipes()
            .then((recipes: Recipe[]) => res.json(recipes))

    /**
     * Retrieves all recipes from the database and returns an array of recipes.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the recipe objects
     */
    findAllRecipes = (req: Request, res: Response) =>
        RecipeController.recipeDao.findAllRecipes()
            .then((recipes: Recipe[]) => res.json(recipes));

}