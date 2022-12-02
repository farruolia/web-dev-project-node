/**
 * @file Declares Bookmark data type representing relationships between
 * users and posts, as in which user bookmarked which post
 */
import Post from "../posts/Post";
import User from "../users/User";

/**
 * @typedef Bookmark Represents bookmark relationship between users and posts,
 * as in which user bookmarked which post
 * @property {Post} bookmarkedPost Post that is bookmarked
 * @property {User} bookmarkedBy User that bookmarks tuit
 */
export default interface Bookmark {

    bookmarkedPost: Post,
    bookmarkedBy: User
};