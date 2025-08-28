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
exports.createSubambienteController = createSubambienteController;
exports.updateSubambienteController = updateSubambienteController;
exports.deleteSubambienteController = deleteSubambienteController;
exports.listSubambientesController = listSubambientesController;
exports.listSubambientesByIdController = listSubambientesByIdController;
const subambienteService = __importStar(require("../../services/subambiente.service"));
async function createSubambienteController(request, reply) {
    try {
        const { ambienteId } = request.params;
        const createData = request.body;
        const subambiente = await subambienteService.createSubambiente(Number(ambienteId), createData);
        reply.status(201).send(subambiente);
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
async function updateSubambienteController(request, reply) {
    try {
        const { id } = request.params;
        const updateData = request.body;
        const subambiente = await subambienteService.updateSubambiente(Number(id), updateData);
        reply.status(200).send(subambiente);
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
async function deleteSubambienteController(request, reply) {
    try {
        const { id } = request.params;
        const result = await subambienteService.deleteSubambiente(Number(id));
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
async function listSubambientesController(request, reply) {
    try {
        const { ambienteId } = request.params;
        const subambientes = await subambienteService.listSubambientes(Number(ambienteId));
        reply.status(200).send(subambientes);
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
async function listSubambientesByIdController(request, reply) {
    try {
        const { id } = request.params;
        const subambiente = await subambienteService.listSubambientesById(Number(id));
        reply.status(200).send(subambiente);
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
//# sourceMappingURL=subambiente.controller.js.map