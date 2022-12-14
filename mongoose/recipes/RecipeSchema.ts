/**
 * @file Implements mongoose schema to map to a MongoDB Posts collection,
 * defines shape of the documents in post
 */
import mongoose, {Schema} from "mongoose";
import Recipe from "../../models/recipes/Recipe";

const RecipeSchema = new mongoose.Schema<Recipe>({
    title: {
        type: String,
        required: true
    },
    chef: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
    },
    steps: [{
        type: String
    }],
    dishId: {
        type: String,
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: "IngredientModel",
    }],
    summary: String,
    postedOn: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: "defaultRecipe.jpeg"
    }
}, {collection: "recipes"});

export default RecipeSchema;


