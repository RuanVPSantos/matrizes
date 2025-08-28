import { CreateAmbiente, UpdateAmbiente } from "../interfaces/ambiente.interface";
import { Ambiente } from "../models/ambiente.model";
export declare class AmbienteRepository {
    create(data: CreateAmbiente): Promise<Ambiente>;
    findById(id: number): Promise<Ambiente | null>;
    findAll(): Promise<Ambiente[]>;
    update(id: number, data: UpdateAmbiente): Promise<Ambiente>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=ambiente.repository.d.ts.map