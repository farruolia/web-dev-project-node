/**
 * @file Declares User data type representing users in Edu Lab
 */
import mongoose from "mongoose";
import UserType from "./UserType";

/**
 * @typedef User Represents a user
 * @property {String} username User's username
 * @property {String} password User's password
 * @property {String} email User's email address
 * @property {String} firstName User's first name
 * @property {String} lastName User's last name
 * @property {String} profilePhoto User's profile photograph
 * @property {String} headerImage User's header image
 * @property {String} biography User's biography
 * @property {Date} dateOfBirth User's date of birth
 * @property {UserType} userType User's type
 * @property {Date} joined User's date of joining
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    userType?: UserType,
    joined?: Date,
};