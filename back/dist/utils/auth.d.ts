export declare class Auth {
    static hashPassword(password: string): Promise<string>;
    static comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    static generateToken(id: number, role: string): string;
    static verifyJwt(token: string): {
        id: number;
        role: string;
    };
}
//# sourceMappingURL=auth.d.ts.map