"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeaderData = getHeaderData;
const ambiente_repository_1 = require("../data/repositories/ambiente.repository");
const subambiente_repository_1 = require("../data/repositories/subambiente.repository");
const artigo_repository_1 = require("../data/repositories/artigo.repository");
const ambienteRepository = new ambiente_repository_1.AmbienteRepository();
const subambienteRepository = new subambiente_repository_1.SubambienteRepository();
const artigoRepository = new artigo_repository_1.ArtigoRepository();
async function getHeaderData() {
    const ambientes = await ambienteRepository.findAll();
    const headerData = await Promise.all(ambientes.map(async (ambiente) => {
        const subambientes = await subambienteRepository.findByAmbienteId(ambiente.id);
        const subambientesWithArtigos = await Promise.all(subambientes.map(async (subambiente) => {
            const artigos = await artigoRepository.findBySubambienteId(subambiente.id);
            return {
                id: subambiente.id,
                name: subambiente.name,
                description: subambiente.description,
                artigos: artigos.map(artigo => ({
                    id: artigo.id,
                    title: artigo.title,
                    description: artigo.description
                }))
            };
        }));
        return {
            id: ambiente.id,
            name: ambiente.name,
            description: ambiente.description,
            subambientes: subambientesWithArtigos
        };
    }));
    return headerData;
}
//# sourceMappingURL=header.service.js.map