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

  // If order is not provided, assign the next available order
  let order = data.order;
  if (order === undefined || order === null) {
    const maxOrder = await blocoRepository.getMaxOrder(artigoId);
    order = maxOrder + 1;
  }

  const bloco = await blocoRepository.create({
    ...data,
    order,
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

export async function reorderBlocos(artigoId: number, orderList: number[]) {
  const artigo = await artigoRepository.findById(artigoId);
  if (!artigo) {
    throw new Error("Artigo not found");
  }

  // Convert array of IDs to array of objects with id and order properties
  const orderObjects = orderList.map((id, index) => ({
    id,
    order: index + 1
  }));

  await blocoRepository.reorderBlocos(artigoId, orderObjects);
  return { message: "Blocos reordered successfully" };
}
