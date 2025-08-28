export class Subambiente {
  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public ambienteId: number,
    public createdAt: Date,
    public updatedAt: Date,
    public artigos?: any[]
  ) {}

  toResponse() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      ambienteId: this.ambienteId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      artigos: this.artigos
    };
  }
}
