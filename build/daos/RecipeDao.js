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
const RecipeModel_1 = __importDefault(require("../mongoose/recipes/RecipeModel"));
/**
 * @class RecipeDao Implements Data Access Object managing data storage
 * of Recipes
 * @property {RecipeDao} recipeDao Private single instance of RecipeDao
 */
class RecipeDao {
    constructor() {
        /**
         * Inserts recipe instance into the database
         * @param {string} uid User who creates recipe
         * @param {Recipe} recipe Recipe to be created
         * @returns Promise To be notified when the recipe is inserted into the database
         */
        this.createRecipe = (uid, recipe) => __awaiter(this, void 0, void 0, function* () {
            return RecipeModel_1.default
                .create(Object.assign(Object.assign({}, recipe), { chef: uid }))
                .catch(error => error);
        });
        /**
         * Updates recipe with new values in database
         * @param {string} rid Primary key of recipe to be updated
         * @param {Recipe} recipe Recipe object containing properties and their new values
         * @returns Promise To be notified when recipe is updated in the database
         */
        this.updateRecipe = (rid, recipe) => __awaiter(this, void 0, void 0, function* () {
            return RecipeModel_1.default
                .updateOne({ _id: rid }, { $set: recipe })
                .catch(error => error);
        });
        /**
         * Removes recipe from the database.
         * @param {string} rid Primary key of recipe to be removed
         * @returns Promise To be notified when recipe is removed from the database
         */
        this.deleteRecipe = (rid) => __awaiter(this, void 0, void 0, function* () {
            return RecipeModel_1.default
                .deleteOne({ _id: rid })
                .catch(error => error);
        });
        /**
         * Uses RecipeModel to retrieve a recipe by id
         * @param {string} rid Recipe id
         * @returns Promise To be notified when the recipe is retrieved from the database
         */
        this.findRecipeById = (rid) => __awaiter(this, void 0, void 0, function* () {
            return RecipeModel_1.default
                .findById(rid)
                .populate("chef")
                .exec()
                .catch(error => error);
        });
        /**
         * Uses RecipeModel to retrieve all recipes by a user
         * @returns Promise To be notified when the recipes are retrieved from the database
         */
        this.findAllRecipesByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return RecipeModel_1.default
                .find({ chef: uid })
                .populate("chef")
                .exec()
                .catch(error => error);
        });
        /**
         * Uses RecipeModel to retrieve a recipe by dishId
         * @param {string} did Dish id
         * @returns Promise To be notified when the recipe is retrieved from the database
         */
        this.findRecipeByDishId = (did) => __awaiter(this, void 0, void 0, function* () {
            return RecipeModel_1.default
                .find({ dishId: did })
                .populate("chef")
                .exec()
                .catch(error => error);
        });
        /**
         * Uses RecipeModel to retrieve 5 random recipes
         * @returns Promise To be notified when the recipes are retrieved from the database
         */
        this.findRandomRecipes = () => __awaiter(this, void 0, void 0, function* () {
            const count = yield RecipeModel_1.default.count();
            const skipRecords = yield RecipeDao.getRandomArbitrary(1, count - 1);
            return RecipeModel_1.default
                .find()
                .skip(skipRecords)
                .exec()
                .catch(error => error);
        });
        /**
         * Uses RecipeModel to retrieve all recipes
         * @returns Promise To be notified when the recipes are retrieved from the database
         */
        this.findAllRecipes = () => __awaiter(this, void 0, void 0, function* () {
            return RecipeModel_1.default.find()
                .populate("chef")
                .exec()
                .catch(error => error);
        });
    }
    static getRandomArbitrary(min, max) {
        return __awaiter(this, void 0, void 0, function* () {
            return Math.ceil(Math.random() * (max - min) + min);
        });
    }
}
exports.default = RecipeDao;
RecipeDao.recipeDao = null;
/**
 * Creates singleton DAO instance
 * @returns RecipeDao
 */
RecipeDao.getInstance = () => {
    if (RecipeDao.recipeDao === null) {
        RecipeDao.recipeDao = new RecipeDao();
    }
    return RecipeDao.recipeDao;
};
