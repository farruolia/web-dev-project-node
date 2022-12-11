"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema to map to a MongoDB Users collection,
 * defines shape of the documents in user
 */
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
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
        required: true,
        enum: ["chef", "moderator", "user"]
    },
}, { collection: "users" });
exports.default = UserSchema;
