import { CreateUser, UpdateUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
export declare class UserRepository {
    create(data: CreateUser): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: number, data: UpdateUser): Promise<User>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=user.repository.d.ts.map