import { Role } from "@prisma/client";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    constructor(id: number, name: string, email: string, password: string, role: Role, blocked: boolean, createdAt: Date, updatedAt: Date);
    toResponse(): {
        id: number;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        blocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    createJwtToken(): string;
    responseJwtToken(): {
        token: string;
        id: number;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        blocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
}
//# sourceMappingURL=user.model.d.ts.map