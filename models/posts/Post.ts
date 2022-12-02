/**
 * @file Declares Post data type representing user's posts
 */
import User from "../users/User";
import mongoose from "mongoose";

/**
 * @typedef Post Represents a post
 * @property {String} post Post posted by a user
 * @property {User} postedBy User who posted
 * @property {Date} postedOn Date on which user posted
 * @property {String} image Image posted with the post
 * @property {String} avatarLogo User's avatar logo
 */
export default interface Post {
    _id?: mongoose.Schema.Types.ObjectId,
    post: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    avatarLogo?: String
};