import { AmbienteRepository } from "../data/repositories/ambiente.repository";
import { SubambienteRepository } from "../data/repositories/subambiente.repository";
import { ArtigoRepository } from "../data/repositories/artigo.repository";

const ambienteRepository = new AmbienteRepository();
const subambienteRepository = new SubambienteRepository();
const artigoRepository = new ArtigoRepository();

export async function getHeaderData() {
  const ambientes = await ambienteRepository.findAll();
  
  const headerData = await Promise.all(
    ambientes.map(async (ambiente) => {
      const subambientes = await subambienteRepository.findByAmbienteId(ambiente.id);
      
      const subambientesWithArtigos = await Promise.all(
        subambientes.map(async (subambiente) => {
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
        })
      );
      
      return {
        id: ambiente.id,
        name: ambiente.name,
        description: ambiente.description,
        subambientes: subambientesWithArtigos
      };
    })
  );
  
  return headerData;
}
