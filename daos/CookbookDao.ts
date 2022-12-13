/**
 * @file Implements DAO managing data storage of cookbooks. Uses mongoose CookbookModel
 * to integrate with MongoDB
 */
import Cookbook from "../models/cookbook/Cookbook";
import CookbookModel from "../mongoose/cookbook/CookbookModel";

/**
 * @class CookbookDao Implements Data Access Object managing data storage
 * of Cookbooks
 * @property {CookbookDao} cookbookDao Private single instance of CookbookDao
 */
export default class CookbookDao {

    private static cookbookDao: CookbookDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns CookbookDao
     */
    public static getInstance = () : CookbookDao => {

        if (CookbookDao.cookbookDao === null){
            CookbookDao.cookbookDao = new CookbookDao();
        }

        return CookbookDao.cookbookDao;
    }

    private constructor() {}

    /**
     * Uses CookbookModel to insert bookmark into database
     * @param {string} rid Recipe id that is bookmarked
     * @param {string} uid User id who bookmarks
     * @returns Promise To be notified when recipe is inserted into the database in cookbooks
     */
    userBookmarksRecipe = async (rid: string, uid: string): Promise<Cookbook> =>
        CookbookModel
            .create({bookmarkedRecipe: rid, bookmarkedBy: uid})
            .catch(error => error);

    /**
     * Uses CookbookModel to remove bookmark from database
     * @param {string} rid Recipe that has to be un-bookmarked
     * @param {string} uid User who bookmarked the recipe
     * @returns Promise To be notified when recipe is removed from the database in cookbooks
     */
    userUnbookmarksRecipe = async (rid: string, uid: string): Promise<any> =>
        CookbookModel
            .deleteOne({bookmarkedRecipe: rid, bookmarkedBy: uid})
            .catch(error => error);

    /**
     * Uses CookbookModel to retrieve a list of recipes bookmarked by a user
     * @param {string} uid User id of the user whose bookmarked recipes have to be retrieved
     * @returns Promise To be notified when the bookmarks are retrieved from the database
     */
    findRecipesBookmarkedByUser = async (uid: string): Promise<Cookbook[]> =>
        CookbookModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedRecipe")
            .exec()
            .catch(error => error);
}