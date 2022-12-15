/**
 * @file Implements mongoose model to CRUD
 * documents in the ingredients collection
 */
import mongoose from "mongoose";
import IngredientSchema from "./IngredientSchema";

const IngredientModel = mongoose.model("IngredientModel", IngredientSchema);

export default IngredientModel;