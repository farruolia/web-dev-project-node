/**
 * @file Declares Like data type representing relationship between
 * users and posts, as in user likes a post
 */
import Post from "../posts/Post";
import User from "../users/User";

/**
 * @typedef Like Represents likes relationship between a user and a post,
 * as in a user likes a post
 * @property {Post} post Post being liked
 * @property {User} likedBy User liking the post
 */

export default interface Like {
    post: Post,
    likedBy: User
};