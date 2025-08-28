import { BlocoType } from "@prisma/client";

export interface CreateBloco {
  type: BlocoType;
  order?: number;
  content: any;
  artigoId: number;
}

export interface UpdateBloco {
  type?: BlocoType;
  order?: number;
  content?: any;
}
