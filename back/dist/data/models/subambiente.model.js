"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subambiente = void 0;
class Subambiente {
    constructor(id, name, description, ambienteId, createdAt, updatedAt, artigos) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.ambienteId = ambienteId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.artigos = artigos;
    }
    toResponse() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            ambienteId: this.ambienteId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            artigos: this.artigos
        };
    }
}
exports.Subambiente = Subambiente;
//# sourceMappingURL=subambiente.model.js.map