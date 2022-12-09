/**
 * @file Declares User data type representing users in Edu Lab
 */
import mongoose from "mongoose";
import UserType from "./UserType";

/**
 * @typedef User Represents a user
 * @property {String} firstname User's first name
 * @property {String} lastname User's last name
 * @property {String} username User's username
 * @property {String} password User's password
 * @property {String} email User's email address
 * @property {String} profilePhoto User's profile photograph
 * @property {UserType} userType User's type
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    email: string,
    profilePhoto?: string,
    userType: UserType
};