"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Controller RESTful Web service API for recipe resource
 */
const RecipeDao_1 = __importDefault(require("../daos/RecipeDao"));
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
class RecipeController {
    constructor() {
        /**
         * @param {Request} req Represents request from client, including body
         * containing the JSON object for the new recipe to be inserted in the
         * database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new recipe that was inserted in the
         * database
         */
        this.createRecipe = (req, res) => {
            RecipeController.recipeDao.createRecipe(req.params.uid, req.body)
                .then((recipe) => res.json(recipe));
        };
        /**
         * @param {Request} req Represents request from client, including path
         * parameter rid identifying the primary key of the recipe to be modified
         * @param {Response} res Represents response to client, including status
         * on whether updating a recipe was successful or not
         */
        this.updateRecipe = (req, res) => RecipeController.recipeDao.updateRecipe(req.params.rid, req.body)
            .then((status) => res.send(status));
        /**
         * @param {Request} req Represents request from client, including path
         * parameter rid identifying the primary key of the recipe to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a recipe was successful or not
         */
        this.deleteRecipe = (req, res) => RecipeController.recipeDao.deleteRecipe(req.params.rid)
            .then((status) => res.send(status));
        /**
         * @param {Request} req Represents request from client, including path
         * parameter rid identifying the primary key of the recipe to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the recipe
         */
        this.findRecipeById = (req, res) => RecipeController.recipeDao.findRecipeById(req.params.rid)
            .then((recipe) => res.json(recipe));
        /**
         * Retrieves all recipes from the database for a particular user and returns
         * an array of recipes.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the recipe objects
         */
        this.findAllRecipesByUser = (req, res) => RecipeController.recipeDao.findAllRecipesByUser(req.params.uid)
            .then((recipes) => res.json(recipes));
        /**
         * @param {Request} req Represents request from client, including path
         * parameter did identifying the primary key of the dish whose recipes are to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the recipes
         */
        this.findRecipeByDishId = (req, res) => RecipeController.recipeDao.findRecipeByDishId(req.params.did)
            .then((recipes) => res.json(recipes));
        /**
         * Retrieves 5 random recipes from the database and returns
         * an array of recipes.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client
         */
        this.findRandomRecipes = (req, res) => RecipeController.recipeDao.findRandomRecipes()
            .then((recipes) => res.json(recipes));
        /**
         * Retrieves all recipes from the database and returns an array of recipes.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the recipe objects
         */
        this.findAllRecipes = (req, res) => RecipeController.recipeDao.findAllRecipes()
            .then((recipes) => res.json(recipes));
    }
}
exports.default = RecipeController;
RecipeController.recipeDao = RecipeDao_1.default.getInstance();
RecipeController.recipeController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return RecipeController
 */
RecipeController.getInstance = (app) => {
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
};
