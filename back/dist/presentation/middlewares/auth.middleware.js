"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authMiddleware = void 0;
const auth_1 = require("../../utils/auth");
const authMiddleware = async (req, reply) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return reply.status(401).send({ message: 'Authorization token is missing' });
        }
        const { id, role } = auth_1.Auth.verifyJwt(token);
        req.user = { id, role };
    }
    catch (error) {
        return reply.status(401).send({ message: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
const adminMiddleware = async (req, reply) => {
    if (!req.user) {
        return reply.status(401).send({ message: 'User not authenticated' });
    }
    if (req.user.role !== 'ADMIN') {
        return reply.status(403).send({ message: 'Admin access required' });
    }
};
exports.adminMiddleware = adminMiddleware;
//# sourceMappingURL=auth.middleware.js.map