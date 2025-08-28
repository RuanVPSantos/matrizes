import { BlocoType } from "@prisma/client";

export class Bloco {
  constructor(
    public id: number,
    public type: BlocoType,
    public order: number,
    public content: any,
    public artigoId: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  toResponse() {
    return {
      id: this.id,
      type: this.type,
      order: this.order,
      content: this.content,
      artigoId: this.artigoId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
