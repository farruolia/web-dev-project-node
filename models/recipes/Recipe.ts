/**
 * @file Declares Recipe data type representing user's posts
 */
import User from "../users/User";
import mongoose from "mongoose";

/**
 * @typedef Recipe Represents a recipe
 * @property {String} title Recipe title posted by a user
 * @property {User} chef User who posted
 * @property {Date} postedOn Date on which user posted
 * @property {String} image Image posted with the recipe
 * @property {String} avatarLogo User's avatar logo
 */
export default interface Recipe {
    _id?: mongoose.Schema.Types.ObjectId,
    title: string,
    chef: User,
    steps: string[],
    dishId: string,
    postedOn?: Date,
    image?: string
};