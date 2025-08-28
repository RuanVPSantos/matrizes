import { PrismaClient } from "@prisma/client";
import { CreateAmbiente, UpdateAmbiente } from "../interfaces/ambiente.interface";
import { Ambiente } from "../models/ambiente.model";

const prisma = new PrismaClient();

export class AmbienteRepository {
  async create(data: CreateAmbiente): Promise<Ambiente> {
    const ambiente = await prisma.ambiente.create({
      data
    });
    return new Ambiente(
      ambiente.id,
      ambiente.name,
      ambiente.description,
      ambiente.createdAt,
      ambiente.updatedAt
    );
  }

  async findById(id: number): Promise<Ambiente | null> {
    const ambiente = await prisma.ambiente.findUnique({
      where: { id },
      include: {
        subambientes: true
      }
    });
    if (!ambiente) return null;
    
    return new Ambiente(
      ambiente.id,
      ambiente.name,
      ambiente.description,
      ambiente.createdAt,
      ambiente.updatedAt,
      ambiente.subambientes
    );
  }

  async findAll(): Promise<Ambiente[]> {
    const ambientes = await prisma.ambiente.findMany({
      include: {
        subambientes: true
      }
    });
    return ambientes.map(ambiente => new Ambiente(
      ambiente.id,
      ambiente.name,
      ambiente.description,
      ambiente.createdAt,
      ambiente.updatedAt,
      ambiente.subambientes
    ));
  }

  async update(id: number, data: UpdateAmbiente): Promise<Ambiente> {
    const ambiente = await prisma.ambiente.update({
      where: { id },
      data
    });
    return new Ambiente(
      ambiente.id,
      ambiente.name,
      ambiente.description,
      ambiente.createdAt,
      ambiente.updatedAt
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.ambiente.delete({
      where: { id }
    });
  }
}
