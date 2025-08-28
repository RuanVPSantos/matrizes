import { BlocoRepository } from "../data/repositories/bloco.repository";
import { CreateBloco, UpdateBloco } from "../data/interfaces/bloco.interface";
import { ArtigoRepository } from "../data/repositories/artigo.repository";

const blocoRepository = new BlocoRepository();
const artigoRepository = new ArtigoRepository();

export async function createBloco(artigoId: number, data: CreateBloco) {
  const artigo = await artigoRepository.findById(artigoId);
  if (!artigo) {
    throw new Error("Artigo not found");
  }

  const bloco = await blocoRepository.create({
    ...data,
    artigoId
  });
  return bloco.toResponse();
}

export async function updateBloco(id: number, data: UpdateBloco) {
  const bloco = await blocoRepository.findById(id);
  if (!bloco) {
    throw new Error("Bloco not found");
  }

  const updatedBloco = await blocoRepository.update(id, data);
  return updatedBloco.toResponse();
}

export async function deleteBloco(id: number) {
  const bloco = await blocoRepository.findById(id);
  if (!bloco) {
    throw new Error("Bloco not found");
  }

  await blocoRepository.delete(id);
  return { message: "Bloco deleted successfully" };
}

export async function reorderBlocos(artigoId: number, orderList: { id: number; order: number }[]) {
  const artigo = await artigoRepository.findById(artigoId);
  if (!artigo) {
    throw new Error("Artigo not found");
  }

  await blocoRepository.reorderBlocos(artigoId, orderList);
  return { message: "Blocos reordered successfully" };
}
