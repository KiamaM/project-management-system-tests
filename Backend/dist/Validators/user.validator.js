"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginUserValidation = joi_1.default.object({
    email: joi_1.default.string().required().email({
        minDomainSegments: 2, tlds: {
            allow: ['com', 'ke']
        }
    }),
    password: joi_1.default.string().required()
});
