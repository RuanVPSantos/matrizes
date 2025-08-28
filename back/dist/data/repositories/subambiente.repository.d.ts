import { CreateSubambiente, UpdateSubambiente } from "../interfaces/subambiente.interface";
import { Subambiente } from "../models/subambiente.model";
export declare class SubambienteRepository {
    create(data: CreateSubambiente): Promise<Subambiente>;
    findById(id: number): Promise<Subambiente | null>;
    findByAmbienteId(ambienteId: number): Promise<Subambiente[]>;
    update(id: number, data: UpdateSubambiente): Promise<Subambiente>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=subambiente.repository.d.ts.map