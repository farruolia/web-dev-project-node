/**
 * @file Implements mongoose schema to map to a MongoDB Bookmarks collection,
 * defines shape of the documents in Cookbook
 */
import mongoose, {Schema} from "mongoose";
import Cookbook from "../../models/cookbook/Cookbook";

const CookbookSchema = new mongoose.Schema<Cookbook>({

    bookmarkedRecipe: {
        type: Schema.Types.ObjectId,
        ref: "RecipeModel"
    },
    bookmarkedBy: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    }
}, {collection: "cookbook"})

export default CookbookSchema;