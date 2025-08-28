import { CreateSubambiente, UpdateSubambiente } from "../data/interfaces/subambiente.interface";
export declare function createSubambiente(ambienteId: number, data: CreateSubambiente): Promise<{
    id: number;
    name: string;
    description: string | null;
    ambienteId: number;
    createdAt: Date;
    updatedAt: Date;
    artigos: any[] | undefined;
}>;
export declare function updateSubambiente(id: number, data: UpdateSubambiente): Promise<{
    id: number;
    name: string;
    description: string | null;
    ambienteId: number;
    createdAt: Date;
    updatedAt: Date;
    artigos: any[] | undefined;
}>;
export declare function deleteSubambiente(id: number): Promise<{
    message: string;
}>;
export declare function listSubambientes(ambienteId: number): Promise<{
    id: number;
    name: string;
    description: string | null;
    ambienteId: number;
    createdAt: Date;
    updatedAt: Date;
    artigos: any[] | undefined;
}[]>;
export declare function listSubambientesById(id: number): Promise<{
    id: number;
    name: string;
    description: string | null;
    ambienteId: number;
    createdAt: Date;
    updatedAt: Date;
    artigos: any[] | undefined;
}>;
//# sourceMappingURL=subambiente.service.d.ts.map