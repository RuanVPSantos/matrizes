import { CreateAmbiente, UpdateAmbiente } from "../data/interfaces/ambiente.interface";
export declare function createAmbiente(data: CreateAmbiente): Promise<{
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    subambientes: any[] | undefined;
}>;
export declare function updateAmbiente(id: number, data: UpdateAmbiente): Promise<{
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    subambientes: any[] | undefined;
}>;
export declare function deleteAmbiente(id: number): Promise<{
    message: string;
}>;
export declare function listAmbientes(): Promise<{
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    subambientes: any[] | undefined;
}[]>;
export declare function listAmbientesById(id: number): Promise<{
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    subambientes: any[] | undefined;
}>;
//# sourceMappingURL=ambiente.service.d.ts.map