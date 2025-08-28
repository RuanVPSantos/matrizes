"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const auth_1 = require("../../utils/auth");
class User {
    constructor(id, name, email, password, role, blocked, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.blocked = blocked;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    toResponse() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            blocked: this.blocked,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
    createJwtToken() {
        return auth_1.Auth.generateToken(this.id, this.role);
    }
    responseJwtToken() {
        return {
            ...this.toResponse(),
            token: this.createJwtToken()
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map