# Estrutura do Projeto – Backend

## Dependências principais
- Fastify (HTTP)
- Zod (validação de entrada/saída)
- Zod-to-fastify (conversão de schemas para validação)
- Prisma (ORM e acesso ao banco)
- JWT + bcrypt (autenticação e senhas)

---

## Estrutura de diretórios

```
back/
├─ presentation/          # Camada de apresentação (HTTP)
│  ├─ routes/             # Definição das rotas Fastify
│  │                      # - Contém prehandlers e middlewares locais
│  │                      # - Inclui validação com Zod e checagem de autenticação (isAuth)
│  │                      # - Cada arquivo define e exporta um router (ex: auth.route.ts, user.route.ts)
│  │
│  ├─ controllers/        # Controladores de requisições
│  │                      # - Recebem a request/response
│  │                      # - Extraem dados adicionais (ex: userId do token, 
dados que vem na forma de queryString ou params, etc.)
│  │                      # - Chamam a camada de serviços
│  │                      # - Definem códigos de resposta HTTP (ex: auth.controller.ts, user.controller.ts)
│  │
│  ├─ schemas/            # Schemas de validação (Zod)
│  │                      # - Definem formatos esperados de entrada e saída
│  │                      # - Usados em rotas e controllers
│  │
│  └─ middlewares/        # Middlewares globais
│                         # - Ex: JWT, CORS
│
├─ services/              # Camada de negócio
│  └─ services/           # Implementação da lógica de negócio
│                         # - Funções chamadas pelos controllers
│                         # - Contêm regras de domínio
│
├─ data/                  # Camada de acesso a dados
│  ├─ models/             # Definições de entidades e DTOs
│  │                      # - Cada tabela do Prisma possui um arquivo correspondente
│  │                      # - Ex: user.model.ts, estado.model.ts
│  │                      # - DTOs podem ter métodos auxiliares (toResponse, canCreate, canUpdate, canDelete)
│  │
│  ├─ interfaces/         # Interfaces de repositórios
│  │                      # - Definem contratos para acesso a dados via DTOs
│  │                      # - Ex: user.interface.ts, estado.interface.ts
│  │
│  └─ repositories/       # Implementação dos repositórios (único ponto de acesso ao banco)
│                         # - CRUD de DTOs
│                         # - Consultas complexas envolvendo múltiplas entidades
│                         # - Cada tabela do Prisma possui um repositório correspondente
│                         # - Ex: user.repository.ts, estado.repository.ts
│
├─ utils/                 # Funções utilitárias auxiliares
│
├─ start_db/              # Scripts de inicialização e seed do banco
│
├─ prisma/                # Configuração do Prisma
│  ├─ schema.prisma       # Definição do schema
│  └─ migrations/         # Histórico de migrações
│
├─ .env                   # Variáveis de ambiente
├─ index.ts               # Ponto de entrada do servidor Fastify
├─ package.json
└─ tsconfig.json
``` 
---

## Fluxo típico de request
1. **Rota** recebe request.  
2. **Controller** valida/auth, extrai dados extras e chama service.  
3. **Service** aplica regras de negócio.  
4. **Repository** acessa banco e retorna DTO.  
5. **Response** volta via controller.

---
## Exemplos de Implementação

### Exemplo de controller:
```typescript

import { FastifyRequest, FastifyReply } from "fastify";
import { ILoginInput, IUserInput } from "@repo/interfaces";
import * as userService from "../../services/user.service";

export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    async userInfoController(request: FastifyRequest, reply: FastifyReply) {
        try {
            if (!request.user?.id) {
                return reply.status(401).send({ message: 'User not authenticated' });
            }
            const userData = await userService.getUserInfo(request.user.id);
            reply.status(200).send(userData);
        } catch (error) {
            if (error instanceof Error) {
                reply.status(400).send(error.message);
            } else {
                reply.status(500).send("Internal server error");
            }
        }
    }
}
```

### Exemplo de rota:
```typescript
import { FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "./user.controller";
import { getAllUsersSchema } from "../schemas/user.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
import { zodToFastify } from "../../utils/zod-fastify";

export default function userRoutes(fastify: FastifyInstance) {
    const userController = new UserController();

    fastify.get(
        "/users/all",
        {
            preHandler: authMiddleware,
            schema: zodToFastify(getAllUsersSchema)
        },
        UserController.getAllUsersController
    );
}
```

### Exemplo de Schema:
```typescript
import { z } from "zod";

export const getAllUsersSchema = z.object({
    body: z.object({
        page: z.number().optional().min(1),
        limit: z.number().optional().min(1),
    })
});
```

### Exemplo de middleware/auth.middleware.ts:
```typescript
import { Auth } from "../../utils/auth";
import { FastifyRequest, FastifyReply } from 'fastify';
import { checkPermission } from '../../utils/check.permission';
import { PrismaClient } from '@repo/database/generated/prisma';

declare module 'fastify' {
    interface FastifyRequest {
        user?: { id: number };
    }
}

export const authMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return reply.status(401).send({ message: 'Authorization token is missing' });
        }

        const { id } = await Auth.verifyJwt(token);

        req.user = { id };
    } catch (error) {
        return reply.status(401).send({ message: 'Invalid token' });
    }
};

```

### Exemplo de utils/auth.ts:
```typescript
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const SALT_ROUNDS = 10;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
}

export class Auth {

    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS);
    }

    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    static generateToken(id: number, role: string): string {
        return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '48h' });
    }

    static verifyJwt(token: string): { id: number, role: string } {
        return jwt.verify(token, JWT_SECRET) as { id: number, role: string };
    }
}
```

### Exemplo de service/auth.service.ts:
```typescript
import { UserRepository } from "../data/repositories/user.repository";
import { RequestLoginUser } from "../data/interfaces/user.interface";
import { Auth } from "../utils/auth";
import { RoleRepository } from "../data/repositories/role.repository";

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

export async function loginUser(data: RequestLoginUser) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
        throw new Error("User not found");
    }
    if (!await Auth.comparePassword(data.password, user.password)) {
        throw new Error("Invalid password");
    }
    return user.responseJwtToken();
}
```

### Exemplo de data/repositories/user.repository.ts:
```typescript
import { PrismaClient } from "@repo/database/generated/prisma";
import { CreateUser, UpdateUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import { PermissionRole } from "../models/permissionRole.model";
import { Permission } from "../models/permission.model";
const prisma = new PrismaClient();

export class UserRepository {
    async create(data: CreateUser): Promise<User> {
        const user = await prisma.user.create({
            data
        })
        const userResponse = await this.findById(user.id);
        if (!userResponse) {
            throw new Error("User not created");
        }
        return userResponse;
    }

    async findById(id: number): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                Role: {
                    include: {
                        permissionRoles: {
                            include: {
                                Permission: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const permissionRoles = user.Role.permissionRoles.map(permissionRole => {
            return new PermissionRole(
                permissionRole.id,
                user.roleId,
                permissionRole.permissionId,
                undefined,
                new Permission(
                    permissionRole.Permission.id,
                    permissionRole.Permission.name,
                    permissionRole.Permission.display,
                    permissionRole.Permission.attachable,
                    permissionRole.Permission.createdAt,
                    permissionRole.Permission.updatedAt,
                    undefined,
                ),
            );
        });

        const roleResponse = new Role(
            user.Role.id,
            user.Role.name,
            user.Role.fixed,
            user.Role.attachable,
            user.Role.createdAt,
            user.Role.updatedAt,
            [],
            permissionRoles,
        );

        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.roleId,
            user.blocked,
            user.createdAt,
            user.updatedAt,
            roleResponse,
            user.blockDate ? user.blockDate : undefined,
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            return null;
        }
        return await this.findById(user.id);
    }

    async update(id: number, data: UpdateUser): Promise<User> {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data,
        })
        const userResponse = await this.findById(user.id);
        if (!userResponse) {
            throw new Error("User not updated");
        }
        return userResponse;
    }

    async delete(id: number): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        const userReq = await prisma.user.delete({
            where: {
                id,
            },
        })
        const userResponse = await this.findById(user.id);
        if (userResponse) {
            throw new Error("User not deleted");
        }
        return user;
    }
}
```

### Exemplo de data/interfaces/user.interface.ts:
```typescript
export interface RequestLoginUser {
    email: string;
    password: string;
}

export interface CreateUser {
    name: string;
    email: string;
    password: string;
    roleId: number;
}

export interface UpdateUser {
    name?: string;
    email?: string;
    password?: string;
    roleId?: number;
    blocked?: boolean;
}
```

### Exemplo de data/models/user.model.ts:
```typescript
import { Role } from "./role.model";
import { Auth } from "../../utils/auth";

export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public roleId: number,
        public blocked: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public Role?: Role,
        public blockDate?: Date,
    ) { }

    canCreateUser(role: Role): boolean {
        if (this.Role?.name.toLowerCase() == "master") {
            return true;
        }
        if (!this.Role?.permissionRoles) {
            throw new Error("Permission roles not found");
        }
        if (this.Role?.permissionRoles.some((permissionRole) => permissionRole.Permission?.name.toLowerCase() == "createusers") && role.attachable) {
            return true;
        }
        return false;
    }

    toResponse() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            roleId: this.roleId,
            blocked: this.blocked,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            blockDate: this.blockDate,
            Role: this.Role?.toResponse(),
        };
    }

    createJwtToken() {
        if (!this.Role) {
            throw new Error("Role not found");
        }
        return Auth.generateToken(this.id, this.Role.name);
    }

    responseJwtToken() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            roleId: this.roleId,
            blocked: this.blocked,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            blockDate: this.blockDate,
            Role: this.Role?.toResponse(),
            token: this.createJwtToken(),
        };
    }
}
```
