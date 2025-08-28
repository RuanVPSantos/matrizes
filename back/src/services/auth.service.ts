import { UserRepository } from "../data/repositories/user.repository";
import { RequestLoginUser, RequestRegisterUser } from "../data/interfaces/user.interface";
import { Auth } from "../utils/auth";
import { Role } from "@prisma/client";

const userRepository = new UserRepository();

export async function registerUser(data: RequestRegisterUser) {
  const existingUser = await userRepository.findByEmail(data.email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await Auth.hashPassword(data.password);
  
  const user = await userRepository.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: Role.USER
  });

  return user.toResponse();
}

export async function loginUser(data: RequestLoginUser) {
  const user = await userRepository.findByEmail(data.email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (user.blocked) {
    throw new Error("User is blocked");
  }

  const isValidPassword = await Auth.comparePassword(data.password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  return user.responseJwtToken();
}

export async function renewToken(userId: number) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.blocked) {
    throw new Error("User is blocked");
  }

  return user.createJwtToken();
}
