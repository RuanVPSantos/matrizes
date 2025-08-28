import { PrismaClient } from "@prisma/client";
import { CreateArtigo, UpdateArtigo } from "../interfaces/artigo.interface";
import { Artigo } from "../models/artigo.model";
import { Bloco } from "../models/bloco.model";

const prisma = new PrismaClient();

export class ArtigoRepository {
  async create(data: CreateArtigo): Promise<Artigo> {
    const artigo = await prisma.artigo.create({
      data
    });
    return new Artigo(
      artigo.id,
      artigo.title,
      artigo.description,
      artigo.subambienteId,
      artigo.createdAt,
      artigo.updatedAt
    );
  }

  async findById(id: number): Promise<Artigo | null> {
    const artigo = await prisma.artigo.findUnique({
      where: { id },
      include: {
        blocks: {
          orderBy: { order: 'asc' }
        }
      }
    });
    if (!artigo) return null;


    const blocos: Bloco[] = [];
    artigo.blocks.forEach(block => {
      blocos.push(new Bloco(
        block.id,
        block.type,
        block.order,
        block.content,
        block.artigoId,
        block.createdAt,
        block.updatedAt
      ));
    });

    return new Artigo(
      artigo.id,
      artigo.title,
      artigo.description,
      artigo.subambienteId,
      artigo.createdAt,
      artigo.updatedAt,
      blocos
    );
  }

  async findBySubambienteId(subambienteId: number): Promise<Artigo[]> {
    const artigos = await prisma.artigo.findMany({
      where: { subambienteId },
      include: {
        blocks: {
          orderBy: { order: 'asc' }
        }
      }
    });
    return artigos.map(artigo => new Artigo(
      artigo.id,
      artigo.title,
      artigo.description,
      artigo.subambienteId,
      artigo.createdAt,
      artigo.updatedAt,
      artigo.blocks
    ));
  }

  async update(id: number, data: UpdateArtigo): Promise<Artigo> {
    const artigo = await prisma.artigo.update({
      where: { id },
      data,
      include: {
        blocks: {
          orderBy: { order: 'asc' }
        }
      }
    });
    return new Artigo(
      artigo.id,
      artigo.title,
      artigo.description,
      artigo.subambienteId,
      artigo.createdAt,
      artigo.updatedAt,
      artigo.blocks
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.artigo.delete({
      where: { id }
    });
  }
}
