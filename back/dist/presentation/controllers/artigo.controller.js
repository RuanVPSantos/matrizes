"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArtigoController = createArtigoController;
exports.updateArtigoController = updateArtigoController;
exports.deleteArtigoController = deleteArtigoController;
exports.listArtigosController = listArtigosController;
exports.getArtigoController = getArtigoController;
const artigoService = __importStar(require("../../services/artigo.service"));
async function createArtigoController(request, reply) {
    try {
        const { subambienteId } = request.params;
        const createData = request.body;
        const artigo = await artigoService.createArtigo(Number(subambienteId), createData);
        reply.status(201).send(artigo);
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(500).send({ message: "Internal server error" });
        }
    }
}
async function updateArtigoController(request, reply) {
    try {
        const { id } = request.params;
        const updateData = request.body;
        const artigo = await artigoService.updateArtigo(Number(id), updateData);
        reply.status(200).send(artigo);
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(500).send({ message: "Internal server error" });
        }
    }
}
async function deleteArtigoController(request, reply) {
    try {
        const { id } = request.params;
        const result = await artigoService.deleteArtigo(Number(id));
        reply.status(200).send(result);
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(500).send({ message: "Internal server error" });
        }
    }
}
async function listArtigosController(request, reply) {
    try {
        const { subambienteId } = request.params;
        const artigos = await artigoService.listArtigos(Number(subambienteId));
        reply.status(200).send(artigos);
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(500).send({ message: "Internal server error" });
        }
    }
}
async function getArtigoController(request, reply) {
    try {
        const { id } = request.params;
        const artigo = await artigoService.getArtigo(Number(id));
        reply.status(200).send(artigo);
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(500).send({ message: "Internal server error" });
        }
    }
}
//# sourceMappingURL=artigo.controller.js.map