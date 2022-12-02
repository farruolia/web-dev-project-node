/**
 * @file Implements mongoose model to CRUD
 * documents in the posts collection
 */
import mongoose from "mongoose";
import PostSchema from "./PostSchema";

const PostModel = mongoose.model("PostModel", PostSchema);

export default PostModel;