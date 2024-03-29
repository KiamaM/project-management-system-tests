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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.checkUserDetails = exports.loginUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const dbhelper_1 = __importDefault(require("../dbHelpers/dbhelper"));
const sqlConfig_1 = require("../Config/sqlConfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_validator_1 = require("../Validators/user.validator");
const dbhelper = new dbhelper_1.default();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //From the request body, get the email and password
        const { email, password } = req.body;
        let { error } = user_validator_1.loginUserValidation.validate(req.body);
        if (error) {
            return res.status(404).json({
                error: error.details[0].message
            });
        }
        console.log("Hello");
        let user = (yield (dbhelper.execute('loginUser', {
            email
        }))).recordset;
        if (((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email) == email) {
            console.log(user[0]);
            const correct_pwd = yield bcrypt_1.default.compare(password, user[0].password);
            console.log(`Correct pw:${correct_pwd}`);
            if (!correct_pwd) {
                return res.json({
                    error: "Incorrect password",
                });
            }
            else {
                const loginCredentials = user.map((response) => {
                    const { Password, first_name, last_name, isDeleted } = response, rest = __rest(response, ["Password", "first_name", "last_name", "isDeleted"]);
                    return rest;
                });
                const token = jsonwebtoken_1.default.sign(loginCredentials[0], process.env.SECRET, {
                    expiresIn: "3600s",
                });
                return res.status(200).json({
                    message: "Login success",
                    token
                });
            }
        }
        else {
            res.json({
                error: "User not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error
        });
    }
});
exports.loginUser = loginUser;
const checkUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        return res.json({
            info: req.info,
        });
    }
});
exports.checkUserDetails = checkUserDetails;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, last_name, first_name, password } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let hashedPwd = yield bcrypt_1.default.hash(password, 5);
        let result = yield dbhelper.execute("resetPassword", {
            email,
            last_name,
            first_name,
            password,
        });
        if (result[0] < 1) {
            return res.json({
                message: "User not found",
            });
        }
        else {
            return res.json({
                message: "Password updated successfully",
            });
        }
    }
    catch (error) {
        return res.sendStatus(501).json({
            error: error,
        });
    }
});
exports.resetPassword = resetPassword;
