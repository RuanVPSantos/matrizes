import { Role } from "@prisma/client";
import { Auth } from "../../utils/auth";

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public role: Role,
    public blocked: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  toResponse() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      blocked: this.blocked,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  createJwtToken() {
    return Auth.generateToken(this.id, this.role);
  }

  responseJwtToken() {
    return {
      ...this.toResponse(),
      token: this.createJwtToken()
    };
  }
}
