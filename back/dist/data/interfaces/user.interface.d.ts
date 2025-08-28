import { Role } from "@prisma/client";
export interface CreateUser {
    name: string;
    email: string;
    password: string;
    role?: Role;
}
export interface UpdateUser {
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
    blocked?: boolean;
}
export interface RequestLoginUser {
    email: string;
    password: string;
}
export interface RequestRegisterUser {
    name: string;
    email: string;
    password: string;
}
//# sourceMappingURL=user.interface.d.ts.map