import { PrismaClient } from "@prisma/client";
import { CreateUser, UpdateUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

const prisma = new PrismaClient();

export class UserRepository {
  async create(data: CreateUser): Promise<User> {
    const user = await prisma.user.create({
      data
    });
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.blocked,
      user.createdAt,
      user.updatedAt
    );
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    if (!user) return null;
    
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.blocked,
      user.createdAt,
      user.updatedAt
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) return null;
    
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.blocked,
      user.createdAt,
      user.updatedAt
    );
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(user => new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.blocked,
      user.createdAt,
      user.updatedAt
    ));
  }

  async update(id: number, data: UpdateUser): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data
    });
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.blocked,
      user.createdAt,
      user.updatedAt
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id }
    });
  }
}
