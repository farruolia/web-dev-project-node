/**
 * @file Declares Ingredient data type representing ingredients in a recipe
 */
import mongoose from "mongoose";

/**
 * @typedef Ingredient Represents an ingredient
 * @property {String} name The name of the ingredient
 * @property {Number} calories The calories in the ingredient
 * @property {Number} fat The fat in the ingredient
 * @property {Number} protein The protein in the ingredient
 * @property {Number} carbs The carbs in the ingredient
 */
export default interface Ingredient {
    _id?: mongoose.Schema.Types.ObjectId,
    name: string,
    calories: number,
    fat: number,
    protein: number,
    carbs: number
};