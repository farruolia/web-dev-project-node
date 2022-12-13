/**
 * @file Implements DAO managing data storage of Likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */

import Cookbook from "../models/cookbook/Cookbook";
import CookbookModel from "../mongoose/cookbook/CookbookModel";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao {

    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = () : LikeDao => {

        if (LikeDao.likeDao === null){
            LikeDao.likeDao = new LikeDao();
        }

        return LikeDao.likeDao;
    }

    private constructor() {}

    /**
     * Uses LikeModel to insert a like into database
     * @param {string} rid Recipe id that is liked
     * @param {string} uid User id who likes
     * @returns Promise To be notified when a recipe like is inserted into the database
     */
    userLikesRecipe = async (rid: string, uid: string): Promise<Cookbook> =>
        CookbookModel
            .create({bookmarkedRecipe: rid, bookmarkedBy: uid})
            .catch(error => error);

}