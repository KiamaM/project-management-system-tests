"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getOneUser = exports.getUsers = exports.createUser = void 0;
const uuid_1 = require("uuid");
const dbhelper_1 = __importDefault(require("../dbHelpers/dbhelper"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//Create a new instance of the dbhelper class
const dbhelper = new dbhelper_1.default;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        console.log(id);
        const { first_name, last_name, email, password } = req.body;
        const hashed_pwd = yield bcrypt_1.default.hash(password, 5);
        console.log("I created this", hashed_pwd);
        let result = yield (dbhelper.execute('registerUsers', {
            user_id: id, first_name, last_name, email, hashed_pwd
        }));
        if (result.rowsAffected[0] > 1) {
            return res.json({
                error: 'Account creation failed'
            });
        }
        else {
            return res.json({
                message: 'Account created successfully',
            });
        }
    }
    catch (error) {
        return res.json({
            error: error.originalError.info.message
        });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = (yield (dbhelper.execute('getALLUsers'))).recordset;
        return res.json({
            users: users
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.info.message
        });
    }
});
exports.getUsers = getUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let user = yield dbhelper.execute("getOneUser", { user_id: id });
        return res.json({
            user
        });
    }
    catch (error) {
        return res.json(error);
    }
});
exports.getOneUser = getOneUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { first_name, last_name, email, password } = req.body;
        const result = yield dbhelper.execute("updateUser", {
            user_id: id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        });
        console.log(result);
        return res.status(200).json({
            message: "User updated successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.params) === null || _a === void 0 ? void 0 : _a['id'];
        const result = yield dbhelper.execute("deleteUser", { user_id });
        return res.status(200).json({
            message: "User deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});
exports.deleteUser = deleteUser;
