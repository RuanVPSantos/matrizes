import { UpdateUser } from "../data/interfaces/user.interface";
export declare function getAllUsers(): Promise<{
    id: number;
    name: string;
    email: string;
    role: import("@prisma/client").$Enums.Role;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function getUserById(id: number): Promise<{
    id: number;
    name: string;
    email: string;
    role: import("@prisma/client").$Enums.Role;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateUser(id: number, data: UpdateUser): Promise<{
    id: number;
    name: string;
    email: string;
    role: import("@prisma/client").$Enums.Role;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteUser(id: number): Promise<{
    message: string;
}>;
export declare function blockUser(id: number): Promise<{
    id: number;
    name: string;
    email: string;
    role: import("@prisma/client").$Enums.Role;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function unblockUser(id: number): Promise<{
    id: number;
    name: string;
    email: string;
    role: import("@prisma/client").$Enums.Role;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=user.service.d.ts.map