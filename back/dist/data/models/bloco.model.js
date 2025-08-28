"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloco = void 0;
class Bloco {
    constructor(id, type, order, content, artigoId, createdAt, updatedAt) {
        this.id = id;
        this.type = type;
        this.order = order;
        this.content = content;
        this.artigoId = artigoId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    toResponse() {
        return {
            id: this.id,
            type: this.type,
            order: this.order,
            content: this.content,
            artigoId: this.artigoId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
exports.Bloco = Bloco;
//# sourceMappingURL=bloco.model.js.map