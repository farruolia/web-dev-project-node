/**
 * @file Implements DAO managing data storage of ingredients. Uses mongoose IngredientModel
 * to integrate with MongoDB
 */
import Ingredient from "../models/ingredients/Ingredient";
import IngredientModel from "../mongoose/ingredients/IngredientModel";

/**
 * @class IngredientDao Implements Data Access Object managing data storage
 * of Ingredients
 * @property {IngredientDao} ingredientDao Private single instance of IngredientDao
 */
export default class IngredientDao {

    private static ingredientDao: IngredientDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns IngredientDao
     */
    public static getInstance = () : IngredientDao => {

        if (IngredientDao.ingredientDao === null){
            IngredientDao.ingredientDao = new IngredientDao();
        }

        return IngredientDao.ingredientDao;
    }

    private constructor() {}

    /**
     * Inserts ingredients instance into the database
     * @param {Ingredient} ingredient Ingredient that is added
     * @returns Promise To be notified when the ingredient is inserted into the database
     */
    createIngredient = async (ingredient: Ingredient): Promise<Ingredient> =>
        IngredientModel
            .create({...ingredient})
            .catch(error => error);

    /**
     * Uses IngredientModel to retrieve ingredients by name
     * @returns Promise To be notified when the ingredients are retrieved from the database
     */
    findIngredientsByName = async (name: string): Promise<Ingredient[]> =>
        IngredientModel
            .find({name: name})
            .exec()
            .catch(error => error);

}