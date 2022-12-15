/**
 * @file Controller RESTful Web service API for comment resource
 */
import CommentDao from "../daos/CommentDao";
import {Express} from "express";

/**
 * @class CommentController Implements RESTful Web service API for comment resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/comments/:rid/users/:uid to create a new comment instance for
 *     a given user</li>
 *     <li>GET /api/comments/:rid to retrieve all comments for a particular recipe instance</li>
 * </ul>
 * @property {CommentDao} commentDao Singleton DAO implementing comments CRUD operations
 * @property {CommentController} commentController Singleton controller implementing
 * RESTful Web service API
 */
export default class CommentController {

    private static commentDao: CommentDao = CommentDao.getInstance();
    private static commentController: CommentController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return CommentController
     */
    public static getInstance = (app: Express): CommentController => {
        if (CommentController.commentController === null) {
            CommentController.commentController = new CommentController();

            app.post("/api/comments/:rid/users/:uid", CommentController.commentController.createComment);
            app.get('/api/comments/:rid', CommentController.commentController.findComments);
        }
        return CommentController.commentController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new comment to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new comment that was inserted in the
     * database
     */
    createComment = (req: any, res: any) => {
        try {
            let userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
            return CommentController.commentDao.createComment(req.params.rid, userId, req.body)
                .then((comment) => res.json(comment));
        }
        catch (e) {
            res.status(403).json({ error: e });
        }
    }

    /**
     * Retrieves all comments from the database for a particular recipe
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the comment objects
     */
    findComments = (req: any, res: any) => {
        try {
            let userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
            return CommentController.commentDao.findComments(req.params.rid)
                .then((comments) => res.json(comments));
        }
        catch (e) {
            res.status(403).json({ error: e });
        }
    }
}