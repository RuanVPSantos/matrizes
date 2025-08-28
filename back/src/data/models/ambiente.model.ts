export class Ambiente {
  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public createdAt: Date,
    public updatedAt: Date,
    public subambientes?: any[]
  ) {}

  toResponse() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      subambientes: this.subambientes
    };
  }
}
