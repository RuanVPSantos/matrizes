import { AmbienteRepository } from "../data/repositories/ambiente.repository";
import { CreateAmbiente, UpdateAmbiente } from "../data/interfaces/ambiente.interface";

const ambienteRepository = new AmbienteRepository();

export async function createAmbiente(data: CreateAmbiente) {
  const ambiente = await ambienteRepository.create(data);
  return ambiente.toResponse();
}

export async function updateAmbiente(id: number, data: UpdateAmbiente) {
  const ambiente = await ambienteRepository.findById(id);
  if (!ambiente) {
    throw new Error("Ambiente not found");
  }

  const updatedAmbiente = await ambienteRepository.update(id, data);
  return updatedAmbiente.toResponse();
}

export async function deleteAmbiente(id: number) {
  const ambiente = await ambienteRepository.findById(id);
  if (!ambiente) {
    throw new Error("Ambiente not found");
  }

  await ambienteRepository.delete(id);
  return { message: "Ambiente deleted successfully" };
}

export async function listAmbientes() {
  const ambientes = await ambienteRepository.findAll();
  return ambientes.map(ambiente => ambiente.toResponse());
}

export async function listAmbientesById(id: number) {
  const ambiente = await ambienteRepository.findById(id);
  if (!ambiente) {
    throw new Error("Ambiente not found");
  }

  return ambiente.toResponse();
}