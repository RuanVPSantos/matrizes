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
exports.createAmbienteController = createAmbienteController;
exports.updateAmbienteController = updateAmbienteController;
exports.deleteAmbienteController = deleteAmbienteController;
exports.listAmbientesController = listAmbientesController;
exports.listAmbientesByIdController = listAmbientesByIdController;
const ambienteService = __importStar(require("../../services/ambiente.service"));
async function createAmbienteController(request, reply) {
    try {
        const createData = request.body;
        const ambiente = await ambienteService.createAmbiente(createData);
        reply.status(201).send(ambiente);
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
async function updateAmbienteController(request, reply) {
    try {
        const { id } = request.params;
        const updateData = request.body;
        const ambiente = await ambienteService.updateAmbiente(Number(id), updateData);
        reply.status(200).send(ambiente);
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
async function deleteAmbienteController(request, reply) {
    try {
        const { id } = request.params;
        const result = await ambienteService.deleteAmbiente(Number(id));
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
async function listAmbientesController(request, reply) {
    try {
        const ambientes = await ambienteService.listAmbientes();
        reply.status(200).send(ambientes);
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
async function listAmbientesByIdController(request, reply) {
    try {
        const { id } = request.params;
        const ambiente = await ambienteService.listAmbientesById(Number(id));
        reply.status(200).send(ambiente);
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
//# sourceMappingURL=ambiente.controller.js.map