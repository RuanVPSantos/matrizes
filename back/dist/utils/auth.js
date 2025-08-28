"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
}
class Auth {
    static async hashPassword(password) {
        return await bcryptjs_1.default.hash(password, SALT_ROUNDS);
    }
    static async comparePassword(password, hashedPassword) {
        return await bcryptjs_1.default.compare(password, hashedPassword);
    }
    static generateToken(id, role) {
        return jsonwebtoken_1.default.sign({ id, role }, JWT_SECRET, { expiresIn: '48h' });
    }
    static verifyJwt(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map