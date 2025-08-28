"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ambiente = void 0;
class Ambiente {
    constructor(id, name, description, createdAt, updatedAt, subambientes) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.subambientes = subambientes;
    }
    toResponse() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            subambientes: this.subambientes
        };
    }
}
exports.Ambiente = Ambiente;
//# sourceMappingURL=ambiente.model.js.map