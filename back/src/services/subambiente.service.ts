import { SubambienteRepository } from "../data/repositories/subambiente.repository";
import { CreateSubambiente, UpdateSubambiente } from "../data/interfaces/subambiente.interface";
import { AmbienteRepository } from "../data/repositories/ambiente.repository";

const subambienteRepository = new SubambienteRepository();
const ambienteRepository = new AmbienteRepository();

export async function createSubambiente(ambienteId: number, data: CreateSubambiente) {
  const ambiente = await ambienteRepository.findById(ambienteId);
  if (!ambiente) {
    throw new Error("Ambiente not found");
  }

  const subambiente = await subambienteRepository.create({
    ...data,
    ambienteId
  });
  return subambiente.toResponse();
}

export async function updateSubambiente(id: number, data: UpdateSubambiente) {
  const subambiente = await subambienteRepository.findById(id);
  if (!subambiente) {
    throw new Error("Subambiente not found");
  }

  const updatedSubambiente = await subambienteRepository.update(id, data);
  return updatedSubambiente.toResponse();
}

export async function deleteSubambiente(id: number) {
  const subambiente = await subambienteRepository.findById(id);
  if (!subambiente) {
    throw new Error("Subambiente not found");
  }

  await subambienteRepository.delete(id);
  return { message: "Subambiente deleted successfully" };
}

export async function listSubambientes(ambienteId: number) {
  const ambiente = await ambienteRepository.findById(ambienteId);
  if (!ambiente) {
    throw new Error("Ambiente not found");
  }

  const subambientes = await subambienteRepository.findByAmbienteId(ambienteId);
  return subambientes.map(subambiente => subambiente.toResponse());
}
