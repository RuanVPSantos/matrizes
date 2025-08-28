"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artigo = void 0;
const bloco_model_1 = require("./bloco.model");
class Artigo {
    constructor(id, title, description, subambienteId, createdAt, updatedAt, blocks) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.subambienteId = subambienteId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.blocks = blocks;
    }
    toResponse() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            subambienteId: this.subambienteId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            blocks: this.blocks ? this.blocks.map(block => {
                // Convert Prisma block to Bloco model and then to response
                const blocoModel = new bloco_model_1.Bloco(block.id, block.type, block.order, block.content, block.artigoId, block.createdAt, block.updatedAt);
                return blocoModel.toResponse();
            }) : undefined
        };
    }
}
exports.Artigo = Artigo;
//# sourceMappingURL=artigo.model.js.map