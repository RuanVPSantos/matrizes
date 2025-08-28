import { ReadingRepository } from "../data/repositories/reading.repository";
import { BlocoRepository } from "../data/repositories/bloco.repository";
import { UserRepository } from "../data/repositories/user.repository";

const readingRepository = new ReadingRepository();
const blocoRepository = new BlocoRepository();
const userRepository = new UserRepository();

export async function markBlocoAsRead(userId: number, blocoId: number) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const bloco = await blocoRepository.findById(blocoId);
  if (!bloco) {
    throw new Error("Bloco not found");
  }

  await readingRepository.markBlocoAsRead(userId, blocoId);
  return { message: "Bloco marked as read" };
}

export async function listReadBlocos(userId: number, artigoId: number) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const readBlocos = await readingRepository.listReadBlocos(userId, artigoId);
  return readBlocos;
}
