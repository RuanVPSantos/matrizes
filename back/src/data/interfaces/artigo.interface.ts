export interface CreateArtigo {
  title: string;
  description?: string;
  subambienteId: number;
}

export interface UpdateArtigo {
  title?: string;
  description?: string;
}
