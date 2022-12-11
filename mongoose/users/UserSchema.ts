/**
 * @file Implements mongoose schema to map to a MongoDB Users collection,
 * defines shape of the documents in user
 */
import mongoose from "mongoose";
import User from "../../models/users/User";

const UserSchema = new mongoose.Schema<User>({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        default: `testPassword${Date.now()}`
    },
    email: {
        type: String,
        required: true,
        default: `testEmail${Date.now()}`
    },
    profilePhoto: String,
    userType: {
        type: String,
        required: true
    },
}, {collection: "users"});

export default UserSchema;