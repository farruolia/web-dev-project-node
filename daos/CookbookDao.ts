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
     * Uses CookbookModel to insert cookbook into database
     * @param {string} rid Recipe id that is bookmarked
     * @param {string} uid User id who bookmarks
     * @returns Promise To be notified when recipe is inserted into the database in cookbooks
     */
    userBookmarksRecipe = async (rid: string, uid: string): Promise<Cookbook> =>
        CookbookModel
            .create({bookmarkedRecipe: rid, bookmarkedBy: uid})
            .catch(error => error);
}