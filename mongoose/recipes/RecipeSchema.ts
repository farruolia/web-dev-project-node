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
        ref: "UserModel"
    },
    steps: [{
        type: String,
        required: true,
    }],
    dishId: {
        type: String
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    image: String
}, {collection: "recipes"});

export default RecipeSchema;


