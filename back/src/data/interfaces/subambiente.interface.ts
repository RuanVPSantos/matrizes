export interface CreateSubambiente {
  name: string;
  description?: string;
  ambienteId: number;
}

export interface UpdateSubambiente {
  name?: string;
  description?: string;
}
