/**
 * @file Implements DAO managing data storage of comments. Uses mongoose CommentsModel
 * to integrate with MongoDB
 */
import Comment from "../models/comments/Comment";
import CommentModel from "../mongoose/comments/CommentModel";
import UserDao from "./UserDao";
import RecipeDao from "./RecipeDao";

/**
 * @class CommentDao Implements Data Access Object managing data storage
 * of Comments
 * @property {CommentDao} commentDao Private single instance of CommentDao
 */
export default class CommentDao {

    private static commentDao: CommentDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns CommentDao
     */
    public static getInstance = () : CommentDao => {

        if (CommentDao.commentDao === null){
            CommentDao.commentDao = new CommentDao();
        }

        return CommentDao.commentDao;
    }

    private constructor() {}

    /**
     * Inserts comment instance into the database
     * @param {string} uid User who comments
     * @param {string} rid Recipe on which the comment is to be added
     * @param {string} comment Comment that is added
     * @returns Promise To be notified when the comment is inserted into the database
     */
    createComment = async (rid: string, uid: string, comment: Comment): Promise<Comment> => {
        const chef = await UserDao.getInstance().findUserById(uid);
        const recipe = await RecipeDao.getInstance().findRecipeById(rid);
        return CommentModel
            .create({...comment, recipe: recipe, postedBy: chef})
            .catch(error => error);
    }

    /**
     * Uses CommentModel to retrieve all comments for a recipe
     * @returns Promise To be notified when the comments are retrieved from the database
     */
    findComments = async (rid: string): Promise<Comment[]> =>
        CommentModel
            .find({recipe: rid})
            .populate("postedBy")
            .exec()
            .catch(error => error);

    /**
     * Uses CommentModel to retrieve all comments for a user
     * @returns Promise To be notified when the comments are retrieved from the database
     */
    findCommentsByUser = async (uid: string): Promise<Comment[]> =>
        CommentModel
            .find({postedBy: uid})
            .populate("postedBy")
            .populate("recipe")
            .exec()
            .catch(error => error);

}