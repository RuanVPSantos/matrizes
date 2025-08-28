import { Bloco } from "./bloco.model";

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
      blocks: this.blocks ? this.blocks.map(block => {
        // Convert Prisma block to Bloco model and then to response
        const blocoModel = new Bloco(
          block.id,
          block.type,
          block.order,
          block.content,
          block.artigoId,
          block.createdAt,
          block.updatedAt
        );
        return blocoModel.toResponse();
      }) : undefined
    };
  }
}
