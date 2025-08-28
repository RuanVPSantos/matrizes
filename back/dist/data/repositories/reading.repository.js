"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ReadingRepository {
    async markBlocoAsRead(userId, blocoId) {
        await prisma.reading.upsert({
            where: {
                userId_blocoId: {
                    userId,
                    blocoId
                }
            },
            update: {},
            create: {
                userId,
                blocoId
            }
        });
    }
    async listReadBlocos(userId, artigoId) {
        const readings = await prisma.reading.findMany({
            where: {
                userId,
                bloco: {
                    artigoId
                }
            },
            select: {
                blocoId: true
            }
        });
        return readings.map(reading => reading.blocoId);
    }
    async isRead(userId, blocoId) {
        const reading = await prisma.reading.findUnique({
            where: {
                userId_blocoId: {
                    userId,
                    blocoId
                }
            }
        });
        return !!reading;
    }
}
exports.ReadingRepository = ReadingRepository;
//# sourceMappingURL=reading.repository.js.map