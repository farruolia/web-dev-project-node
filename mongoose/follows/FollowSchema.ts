/**
 * @file Implements mongoose schema to map to a MongoDB Follows collection,
 * defines shape of the documents in Follow
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

const FollowSchema = new mongoose.Schema<Follow>({

    userBeingFollowed: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },
    userFollowing: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    }
}, {collection: "follows"})

export default FollowSchema;