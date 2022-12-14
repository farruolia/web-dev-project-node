/**
 * @file Declares Like data type representing relationship between
 * users and posts, as in user likes a post
 */
import Recipe from "../recipes/Recipe";
import User from "../users/User";

/**
 * @typedef Like Represents likes relationship between a user and a post,
 * as in a user likes a post
 * @property {Recipe} post Recipe being liked
 * @property {User} likedBy User liking the post
 */

export default interface Like {
    likedRecipe: Recipe,
    likedBy: User
};