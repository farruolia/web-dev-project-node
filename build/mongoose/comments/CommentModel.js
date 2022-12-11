"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the comments collection
 */
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema_1 = __importDefault(require("./CommentSchema"));
const CommentModel = mongoose_1.default.model("CommentModel", CommentSchema_1.default);
exports.default = CommentModel;
