import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, Users } from 'lucide-react';
import { publicApi } from '../services/api';
import { Ambiente, Subambiente } from '../types';

const AmbienteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ambiente, setAmbiente] = useState<Ambiente | null>(null);
  const [subambientes, setSubambientes] = useState<Subambiente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAmbiente = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const ambienteId = parseInt(id, 10);

      const ambienteResponse = await publicApi.getAmbiente(ambienteId);
      setAmbiente(ambienteResponse.data);

      const subambientesResponse = await publicApi.getSubambientes(ambienteId);
      setSubambientes(subambientesResponse.data);
    } catch (err) {
      console.error('Erro ao carregar ambiente:', err);
      setError('Erro ao carregar ambiente');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadAmbiente();
  }, [loadAmbiente]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando ambiente...</p>
        </div>
      </div>
    );
  }

  if (error || !ambiente) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Erro</h1>
          <p className="text-gray-600 mb-6">{error || 'Ambiente não encontrado'}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar à página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </Link>
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-900">{ambiente.name}</h1>
              <p className="mt-2 text-lg text-gray-600">{ambiente.description}</p>

              <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{subambientes.length} subambientes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>
                    {subambientes.reduce((total, sub) => total + (sub.artigos?.length || 0), 0)} artigos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {subambientes.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum subambiente encontrado
            </h2>
            <p className="text-gray-500">
              Este ambiente ainda não possui subambientes cadastrados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subambientes.map((subambiente) => (
              <Link
                key={subambiente.id}
                to={`/ambientes/${ambiente.id}/subambientes/${subambiente.id}`}
                className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {subambiente.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {subambiente.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <BookOpen className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{subambiente.artigos?.length || 0} artigos</span>
                  </div>
                </div>

                {subambiente.artigos && subambiente.artigos.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Artigos recentes:</h4>
                    {subambiente.artigos.slice(0, 2).map((artigo) => (
                      <div
                        key={artigo.id}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex-1">
                          <Link
                            to={`/artigos/${artigo.id}`}
                            className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors block"
                          >
                            {artigo.title}
                          </Link>
                          <p className="text-xs text-gray-600 line-clamp-1">
                            {artigo.description}
                          </p>
                        </div>
                      </div>
                    ))}
                    {subambiente.artigos.length > 2 && (
                      <p className="text-xs text-blue-600 hover:text-blue-700 transition-colors">
                        +{subambiente.artigos.length - 2} mais artigos
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-blue-600 font-medium">
                    <span>Explorar subambiente</span>
                    <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AmbienteDetail;
