import { FastifyRequest, FastifyReply } from 'fastify';
declare module 'fastify' {
    interface FastifyRequest {
        user?: {
            id: number;
            role: string;
        };
    }
}
export declare const authMiddleware: (req: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
export declare const adminMiddleware: (req: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
//# sourceMappingURL=auth.middleware.d.ts.map