/**
 * @file Implements mongoose model to CRUD
 * documents in the bookmarks collection
 */
import mongoose from "mongoose";
import CookbookSchema from "./CookbookSchema";

const CookbookModel = mongoose.model("CookbookModel", CookbookSchema);

export default CookbookModel;