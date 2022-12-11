"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the posts collection
 */
const mongoose_1 = __importDefault(require("mongoose"));
const RecipeSchema_1 = __importDefault(require("./RecipeSchema"));
const RecipeModel = mongoose_1.default.model("RecipeModel", RecipeSchema_1.default);
exports.default = RecipeModel;
