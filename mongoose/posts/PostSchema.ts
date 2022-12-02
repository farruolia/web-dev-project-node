/**
 * @file Implements mongoose schema to map to a MongoDB Posts collection,
 * defines shape of the documents in post
 */
import mongoose, {Schema} from "mongoose";
import Post from "../../models/posts/Post";

const PostSchema = new mongoose.Schema<Post>({
    post: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    image: String,
    avatarLogo: String
}, {collection: "posts"});

export default PostSchema;


