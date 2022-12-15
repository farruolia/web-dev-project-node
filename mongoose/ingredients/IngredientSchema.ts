/**
 * @file Implements mongoose schema to map to a MongoDB Ingredients collection,
 * defines shape of the documents in ingredient
 */
import mongoose, {Schema} from "mongoose";
import Ingredient from "../../models/ingredients/Ingredient";

const IngredientSchema = new mongoose.Schema<Ingredient>({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        default: 0
    },
    fat: {
        type: Number,
        default: 0
    },
    protein: {
        type: Number,
        default: 0
    },
    carbs: {
        type: Number,
        default: 0
    },
}, {collection: "ingredients"});

export default IngredientSchema;


