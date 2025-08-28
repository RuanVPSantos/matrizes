import { ArtigoRepository } from "../data/repositories/artigo.repository";
import { CreateArtigo, UpdateArtigo } from "../data/interfaces/artigo.interface";
import { SubambienteRepository } from "../data/repositories/subambiente.repository";

const artigoRepository = new ArtigoRepository();
const subambienteRepository = new SubambienteRepository();

export async function createArtigo(subambienteId: number, data: CreateArtigo) {
  const subambiente = await subambienteRepository.findById(subambienteId);
  if (!subambiente) {
    throw new Error("Subambiente not found");
  }

  const artigo = await artigoRepository.create({
    ...data,
    subambienteId
  });
  return artigo.toResponse();
}

export async function updateArtigo(id: number, data: UpdateArtigo) {
  const artigo = await artigoRepository.findById(id);
  if (!artigo) {
    throw new Error("Artigo not found");
  }

  const updatedArtigo = await artigoRepository.update(id, data);
  return updatedArtigo.toResponse();
}

export async function deleteArtigo(id: number) {
  const artigo = await artigoRepository.findById(id);
  if (!artigo) {
    throw new Error("Artigo not found");
  }

  await artigoRepository.delete(id);
  return { message: "Artigo deleted successfully" };
}

export async function listArtigos(subambienteId: number) {
  const subambiente = await subambienteRepository.findById(subambienteId);
  if (!subambiente) {
    throw new Error("Subambiente not found");
  }

  const artigos = await artigoRepository.findBySubambienteId(subambienteId);
  return artigos.map(artigo => artigo.toResponse());
}

export async function getArtigo(artigoId: number) {
  const artigo = await artigoRepository.findById(artigoId);
  if (!artigo) {
    throw new Error("Artigo not found");
  }

  return artigo.toResponse();
}
