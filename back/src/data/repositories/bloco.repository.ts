import { PrismaClient } from "@prisma/client";
import { CreateBloco, UpdateBloco } from "../interfaces/bloco.interface";
import { Bloco } from "../models/bloco.model";

const prisma = new PrismaClient();

export class BlocoRepository {
  async create(data: CreateBloco): Promise<Bloco> {
    // Ensure order is always provided as a number for Prisma
    const blocoData = {
      ...data,
      order: data.order ?? 0  // Default to 0 if order is undefined
    };

    const bloco = await prisma.bloco.create({
      data: blocoData
    });
    return new Bloco(
      bloco.id,
      bloco.type,
      bloco.order,
      bloco.content,
      bloco.artigoId,
      bloco.createdAt,
      bloco.updatedAt
    );
  }

  async findById(id: number): Promise<Bloco | null> {
    const bloco = await prisma.bloco.findUnique({
      where: { id }
    });
    if (!bloco) return null;

    return new Bloco(
      bloco.id,
      bloco.type,
      bloco.order,
      bloco.content,
      bloco.artigoId,
      bloco.createdAt,
      bloco.updatedAt
    );
  }

  async findByArtigoId(artigoId: number): Promise<Bloco[]> {
    const blocos = await prisma.bloco.findMany({
      where: { artigoId },
      orderBy: { order: 'asc' }
    });
    return blocos.map(bloco => new Bloco(
      bloco.id,
      bloco.type,
      bloco.order,
      bloco.content,
      bloco.artigoId,
      bloco.createdAt,
      bloco.updatedAt
    ));
  }

  async update(id: number, data: UpdateBloco): Promise<Bloco> {
    const bloco = await prisma.bloco.update({
      where: { id },
      data
    });
    return new Bloco(
      bloco.id,
      bloco.type,
      bloco.order,
      bloco.content,
      bloco.artigoId,
      bloco.createdAt,
      bloco.updatedAt
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.bloco.delete({
      where: { id }
    });
  }

  async reorderBlocos(artigoId: number, orderList: { id: number; order: number }[]): Promise<void> {
    await prisma.$transaction(
      orderList.map(item =>
        prisma.bloco.update({
          where: { id: item.id },
          data: { order: item.order }
        })
      )
    );
  }

  async getMaxOrder(artigoId: number): Promise<number> {
    const result = await prisma.bloco.aggregate({
      where: { artigoId },
      _max: {
        order: true
      }
    });

    return result._max.order || 0;
  }
}
