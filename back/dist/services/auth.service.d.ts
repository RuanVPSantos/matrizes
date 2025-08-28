import { RequestLoginUser, RequestRegisterUser } from "../data/interfaces/user.interface";
export declare function registerUser(data: RequestRegisterUser): Promise<{
    id: number;
    name: string;
    email: string;
    role: import("@prisma/client").$Enums.Role;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function loginUser(data: RequestLoginUser): Promise<{
    token: string;
    id: number;
    name: string;
    email: string;
    role: import("@prisma/client").$Enums.Role;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function renewToken(userId: number): Promise<string>;
//# sourceMappingURL=auth.service.d.ts.map