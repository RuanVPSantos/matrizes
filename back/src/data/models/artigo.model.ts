export class Artigo {
  constructor(
    public id: number,
    public title: string,
    public description: string | null,
    public subambienteId: number,
    public createdAt: Date,
    public updatedAt: Date,
    public blocks?: any[]
  ) {}

  toResponse() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      subambienteId: this.subambienteId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      blocks: this.blocks
    };
  }
}
