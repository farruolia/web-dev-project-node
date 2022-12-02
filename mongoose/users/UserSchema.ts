/**
 * @file Implements mongoose schema to map to a MongoDB Users collection,
 * defines shape of the documents in user
 */
import mongoose from "mongoose";
import User from "../../models/users/User";

const UserSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: true,
        default: `testUsername${Date.now()}`
    },
    password: {
        type: String,
        required: true,
        default: `testPassword${Date.now()}`
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        default: `testEmail${Date.now()}`
    },
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    userType: {
        type: String,
        enum: ["STUDENT", "PROFESSOR"]
    },
    joined: {
        type: Date,
        default: Date.now
    }
}, {collection: "users"});

export default UserSchema;