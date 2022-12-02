/**
 * @file Implements mongoose schema to map to a MongoDB Bookmarks collection,
 * defines shape of the documents in Bookmark
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({

    bookmarkedPost: {
        type: Schema.Types.ObjectId,
        ref: "PostModel"
    },
    bookmarkedBy: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    }
}, {collection: "bookmarks"})

export default BookmarkSchema;