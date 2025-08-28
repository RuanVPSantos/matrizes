import { CreateArtigo, UpdateArtigo } from "../interfaces/artigo.interface";
import { Artigo } from "../models/artigo.model";
export declare class ArtigoRepository {
    create(data: CreateArtigo): Promise<Artigo>;
    findById(id: number): Promise<Artigo | null>;
    findBySubambienteId(subambienteId: number): Promise<Artigo[]>;
    update(id: number, data: UpdateArtigo): Promise<Artigo>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=artigo.repository.d.ts.map