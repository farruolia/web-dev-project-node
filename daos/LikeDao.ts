/**
 * @file Implements DAO managing data storage of Likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import Like from "../models/likes/Like";
import LikeModel from "../mongoose/likes/LikeModel";

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
    userLikesRecipe = async (rid: string, uid: string): Promise<Like> =>
        LikeModel
            .create({likedRecipe: rid, likedBy: uid})
            .catch(error => error);

    /**
     * Uses LikeModel to remove like from database
     * @param {string} rid Recipe that has to be un-liked
     * @param {string} uid User who liked the recipe
     * @returns Promise To be notified when recipe is removed from the database in likes
     */
    userUnlikesRecipe = async (rid: string, uid: string): Promise<any> =>
        LikeModel
            .deleteOne({likedRecipe: rid, likedBy: uid})
            .catch(error => error);

    /**
     * Uses LikeModel to retrieve a list of recipes liked by a user
     * @param {string} uid User id of the user whose liked recipes have to be retrieved
     * @returns Promise To be notified when the likes are retrieved from the database
     */
    findRecipesLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate({
                path: 'likedRecipe',
                populate: {
                    path: 'chef',
                    model: 'UserModel'
                }
            })
            .exec()
            .catch(error => error);

    /**
     * Uses LikeModel to retrieve a list of users that liked a recipe
     * @param {string} rid Recipe id of the recipe liked by users
     * @returns Promise To be notified when the likes are retrieved from the database
     */
    findUsersThatLikedRecipe = async (rid: string): Promise<Like[]> =>
        LikeModel
            .find({likedRecipe: rid})
            .populate("likedBy")
            .populate({
                path: 'likedRecipe',
                populate: {
                    path: 'chef',
                    model: 'UserModel'
                }
            })
            .exec()
            .catch(error => error);

    /**
     * Uses LikeModel to retrieve whether a user has liked a recipe or not
     * @param {string} rid Recipe id of the recipe liked by user
     * @param {string} uid User id of the user who liked recipe
     * @returns Promise To be notified when the boolean value is returned
     */
    isLikedByUser = async (rid: string, uid: string): Promise<Like[]> =>
        LikeModel
            .exists({likedRecipe: rid, likedBy: uid})
            .catch(error => error);

}