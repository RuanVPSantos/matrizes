import { PrismaClient } from "@prisma/client";
import { CreateSubambiente, UpdateSubambiente } from "../interfaces/subambiente.interface";
import { Subambiente } from "../models/subambiente.model";

const prisma = new PrismaClient();

export class SubambienteRepository {
  async create(data: CreateSubambiente): Promise<Subambiente> {
    const subambiente = await prisma.subambiente.create({
      data
    });
    return new Subambiente(
      subambiente.id,
      subambiente.name,
      subambiente.description,
      subambiente.ambienteId,
      subambiente.createdAt,
      subambiente.updatedAt
    );
  }

  async findById(id: number): Promise<Subambiente | null> {
    const subambiente = await prisma.subambiente.findUnique({
      where: { id },
      include: {
        artigos: true
      }
    });
    if (!subambiente) return null;
    
    return new Subambiente(
      subambiente.id,
      subambiente.name,
      subambiente.description,
      subambiente.ambienteId,
      subambiente.createdAt,
      subambiente.updatedAt,
      subambiente.artigos
    );
  }

  async findByAmbienteId(ambienteId: number): Promise<Subambiente[]> {
    const subambientes = await prisma.subambiente.findMany({
      where: { ambienteId },
      include: {
        artigos: true
      }
    });
    return subambientes.map(subambiente => new Subambiente(
      subambiente.id,
      subambiente.name,
      subambiente.description,
      subambiente.ambienteId,
      subambiente.createdAt,
      subambiente.updatedAt,
      subambiente.artigos
    ));
  }

  async update(id: number, data: UpdateSubambiente): Promise<Subambiente> {
    const subambiente = await prisma.subambiente.update({
      where: { id },
      data
    });
    return new Subambiente(
      subambiente.id,
      subambiente.name,
      subambiente.description,
      subambiente.ambienteId,
      subambiente.createdAt,
      subambiente.updatedAt
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.subambiente.delete({
      where: { id }
    });
  }
}
