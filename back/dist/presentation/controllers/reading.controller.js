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
exports.markBlocoAsReadController = markBlocoAsReadController;
exports.listReadBlocosController = listReadBlocosController;
const readingService = __importStar(require("../../services/reading.service"));
async function markBlocoAsReadController(request, reply) {
    try {
        if (!request.user?.id) {
            return reply.status(401).send({ message: 'User not authenticated' });
        }
        const { blocoId } = request.body;
        const result = await readingService.markBlocoAsRead(Number(request.user.id), Number(blocoId));
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
async function listReadBlocosController(request, reply) {
    try {
        if (!request.user?.id) {
            return reply.status(401).send({ message: 'User not authenticated' });
        }
        const { artigoId } = request.params;
        const readBlocos = await readingService.listReadBlocos(Number(request.user.id), Number(artigoId));
        reply.status(200).send(readBlocos);
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
//# sourceMappingURL=reading.controller.js.map