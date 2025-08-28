import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReadingRepository {
  async markBlocoAsRead(userId: number, blocoId: number): Promise<void> {
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

  async listReadBlocos(userId: number, artigoId: number): Promise<number[]> {
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

  async isRead(userId: number, blocoId: number): Promise<boolean> {
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
