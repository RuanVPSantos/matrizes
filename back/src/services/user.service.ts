import { UserRepository } from "../data/repositories/user.repository";
import { UpdateUser } from "../data/interfaces/user.interface";
import { Auth } from "../utils/auth";

const userRepository = new UserRepository();

export async function getAllUsers() {
  const users = await userRepository.findAll();
  return users.map(user => user.toResponse());
}

export async function getUserById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user.toResponse();
}

export async function updateUser(id: number, data: UpdateUser) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  if (data.password) {
    data.password = await Auth.hashPassword(data.password);
  }

  const updatedUser = await userRepository.update(id, data);
  return updatedUser.toResponse();
}

export async function deleteUser(id: number) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  await userRepository.delete(id);
  return { message: "User deleted successfully" };
}

export async function blockUser(id: number) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await userRepository.update(id, { blocked: true });
  return updatedUser.toResponse();
}

export async function unblockUser(id: number) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await userRepository.update(id, { blocked: false });
  return updatedUser.toResponse();
}
