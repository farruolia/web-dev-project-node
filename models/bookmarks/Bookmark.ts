/**
 * @file Declares Bookmark data type representing relationships between
 * users and posts, as in which user bookmarked which post
 */
import Recipe from "../recipes/Recipe";
import User from "../users/User";

/**
 * @typedef Bookmark Represents bookmark relationship between users and posts,
 * as in which user bookmarked which post
 * @property {Recipe} bookmarkedPost Recipe that is bookmarked
 * @property {User} bookmarkedBy User that bookmarks tuit
 */
export default interface Bookmark {

    bookmarkedPost: Recipe,
    bookmarkedBy: User
};