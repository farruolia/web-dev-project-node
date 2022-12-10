/**
 * @file Implements mongoose model to CRUD
 * documents in the posts collection
 */
import mongoose from "mongoose";
import RecipeSchema from "./RecipeSchema";

const RecipeModel = mongoose.model("RecipeModel", RecipeSchema);

export default RecipeModel;