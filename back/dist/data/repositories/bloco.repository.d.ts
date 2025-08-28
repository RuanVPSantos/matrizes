import { CreateBloco, UpdateBloco } from "../interfaces/bloco.interface";
import { Bloco } from "../models/bloco.model";
export declare class BlocoRepository {
    create(data: CreateBloco): Promise<Bloco>;
    findById(id: number): Promise<Bloco | null>;
    findByArtigoId(artigoId: number): Promise<Bloco[]>;
    update(id: number, data: UpdateBloco): Promise<Bloco>;
    delete(id: number): Promise<void>;
    reorderBlocos(artigoId: number, orderList: {
        id: number;
        order: number;
    }[]): Promise<void>;
    getMaxOrder(artigoId: number): Promise<number>;
}
//# sourceMappingURL=bloco.repository.d.ts.map