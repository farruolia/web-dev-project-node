/**
 * @file Declares Cookbook data type representing relationships between
 * users and posts, as in which user bookmarked which recipe
 */
import Recipe from "../recipes/Recipe";
import User from "../users/User";

/**
 * @typedef Cookbook Represents bookmark relationship between users and posts,
 * as in which user bookmarked which recipe
 * @property {Recipe} bookmarkedPost Recipe that is bookmarked
 * @property {User} bookmarkedBy User that bookmarks tuit
 */
export default interface Cookbook {

    bookmarkedRecipe: Recipe,
    bookmarkedBy: User
};