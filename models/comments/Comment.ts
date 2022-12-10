/**
 * @file Declares Comment data type representing user's comments
 */
import User from "../users/User";
import mongoose from "mongoose";
import Recipe from "../recipes/Recipe";

/**
 * @typedef Comment Represents a comment
 * @property {Recipe} post The post commented on
 * @property {String} comment Commented posted by user
 * @property {User} postedBy User who posted the comment
 * @property {Date} postedOn Date on which user posted comment
 */
export default interface Comment {
    _id?: mongoose.Schema.Types.ObjectId,
    post: Recipe,
    comment: string,
    postedBy: User,
    postedOn?: Date
};