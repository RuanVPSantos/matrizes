import { PrismaClient } from "@prisma/client";
import { CreateArtigo, UpdateArtigo } from "../interfaces/artigo.interface";
import { Artigo } from "../models/artigo.model";

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

  async delete(id: number): Promise<void> {
    await prisma.artigo.delete({
      where: { id }
    });
  }
}
