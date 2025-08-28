import { Auth } from "../../utils/auth";
import { FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        user?: { id: number; role: string };
    }
}

export const authMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return reply.status(401).send({ message: 'Authorization token is missing' });
        }

        const { id, role } = Auth.verifyJwt(token);
        req.user = { id, role };
    } catch (error) {
        return reply.status(401).send({ message: 'Invalid token' });
    }
};

export const adminMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
    if (!req.user) {
        return reply.status(401).send({ message: 'User not authenticated' });
    }

    if (req.user.role !== 'ADMIN') {
        return reply.status(403).send({ message: 'Admin access required' });
    }
};
