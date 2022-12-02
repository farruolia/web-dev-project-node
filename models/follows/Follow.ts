/**
 * @file Declares Follow data type representing relationships between
 * users, as in which user follows which user, and which user is followed by which user
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follows relationship between users,
 * as in which user follows which user, and which user is followed by which user
 * @property {User} userFollowed User that is followed
 * @property {User} userFollowing User that is following the other user
 */
export default interface Follow {

    userBeingFollowed: User,
    userFollowing: User
};