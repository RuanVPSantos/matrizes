import { PrismaClient } from "@prisma/client";
import { CreateBloco, UpdateBloco } from "../interfaces/bloco.interface";
import { Bloco } from "../models/bloco.model";

const prisma = new PrismaClient();

export class BlocoRepository {
  async create(data: CreateBloco): Promise<Bloco> {
    const bloco = await prisma.bloco.create({
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
}
