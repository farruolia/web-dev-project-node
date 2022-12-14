/**
 * @file Implements DAO managing data storage of recipes. Uses mongoose RecipeModel
 * to integrate with MongoDB
 */
import Recipe from "../models/recipes/Recipe";
import RecipeModel from "../mongoose/recipes/RecipeModel";
import UserDao from "./UserDao";

/**
 * @class RecipeDao Implements Data Access Object managing data storage
 * of Recipes
 * @property {RecipeDao} recipeDao Private single instance of RecipeDao
 */
export default class RecipeDao {

    private static recipeDao: RecipeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns RecipeDao
     */
    public static getInstance = (): RecipeDao => {
        if (RecipeDao.recipeDao === null) {
            RecipeDao.recipeDao = new RecipeDao();
        }
        return RecipeDao.recipeDao;
    }

    private constructor() {}

    /**
     * Inserts recipe instance into the database
     * @param {string} uid User who creates recipe
     * @param {Recipe} recipe Recipe to be created
     * @returns Promise To be notified when the recipe is inserted into the database
     */
    createRecipe = async (uid: string, recipe: Recipe): Promise<Recipe> => {
        const chef = await UserDao.getInstance().findUserById(uid);
        return RecipeModel
            .create({...recipe, chef: chef})
            .catch(error => error);
    }


    /**
     * Updates recipe with new values in database
     * @param {string} rid Primary key of recipe to be updated
     * @param {Recipe} recipe Recipe object containing properties and their new values
     * @returns Promise To be notified when recipe is updated in the database
     */
    updateRecipe = async (rid: string, recipe: Recipe): Promise<any> =>
        RecipeModel
            .updateOne(
                {_id: rid},
                {$set: recipe})
            .catch(error => error);

    /**
     * Removes recipe from the database.
     * @param {string} rid Primary key of recipe to be removed
     * @returns Promise To be notified when recipe is removed from the database
     */
    deleteRecipe = async (rid: string): Promise<any> =>
        RecipeModel
            .deleteOne({_id: rid})
            .catch(error => error);

    /**
     * Uses RecipeModel to retrieve a recipe by id
     * @param {string} rid Recipe id
     * @returns Promise To be notified when the recipe is retrieved from the database
     */
    findRecipeById = async (rid: string): Promise<any> =>
        RecipeModel
            .findById(rid)
            .populate("chef")
            .exec()
            .catch(error => error);

    /**
     * Uses RecipeModel to retrieve all recipes by a user
     * @returns Promise To be notified when the recipes are retrieved from the database
     */
    findAllRecipesByUser = async (uid: string): Promise<Recipe[]> =>
        RecipeModel
            .find({chef: uid})
            .populate("chef")
            .exec()
            .catch(error => error);

    /**
     * Uses RecipeModel to retrieve a recipe by dishId
     * @param {string} did Dish id
     * @returns Promise To be notified when the recipe is retrieved from the database
     */
    findRecipeByDishId = async (did: string): Promise<any> =>
        RecipeModel
            .find({dishId: did})
            .populate("chef")
            .exec()
            .catch(error => error);


    /**
     * Uses RecipeModel to retrieve all recipes
     * @returns Promise To be notified when the recipes are retrieved from the database
     */
    findAllRecipes = async (): Promise<Recipe[]> => {
        return RecipeModel.find()
            .populate("chef")
            .exec()
            .catch(error => error);
    }

}