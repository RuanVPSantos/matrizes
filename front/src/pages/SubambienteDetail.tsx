import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText } from 'lucide-react';
import { publicApi } from '../services/api';
import { Subambiente, Artigo } from '../types';

const SubambienteDetail: React.FC = () => {
  const { ambienteId, subambienteId } = useParams<{ ambienteId: string; subambienteId: string }>();
  const [subambiente, setSubambiente] = useState<Subambiente | null>(null);
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSubambiente = useCallback(async () => {
    if (!subambienteId || !ambienteId) return;

    try {
      setLoading(true);

      // Buscar subambiente específico
      const subambientesResponse = await publicApi.getSubambientes(parseInt(ambienteId, 10));
      const foundSubambiente = subambientesResponse.data.find(
        (sub: Subambiente) => sub.id === parseInt(subambienteId, 10)
      );

      if (!foundSubambiente) {
        setError('Subambiente não encontrado');
        return;
      }

      setSubambiente(foundSubambiente);

      // Buscar artigos do subambiente
      const artigosResponse = await publicApi.getArtigos(parseInt(subambienteId, 10));
      setArtigos(artigosResponse.data);
    } catch (err) {
      console.error('Erro ao carregar subambiente:', err);
      setError('Erro ao carregar subambiente');
    } finally {
      setLoading(false);
    }
  }, [subambienteId, ambienteId]);

  useEffect(() => {
    loadSubambiente();
  }, [loadSubambiente]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando subambiente...</p>
        </div>
      </div>
    );
  }

  if (error || !subambiente) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Erro</h1>
          <p className="text-gray-600 mb-6">{error || 'Subambiente não encontrado'}</p>
          <Link
            to={ambienteId ? `/ambientes/${ambienteId}` : '/'}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao ambiente
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
                to={ambienteId ? `/ambientes/${ambienteId}` : '/'}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar ao ambiente
              </Link>
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-900">{subambiente.name}</h1>
              <p className="mt-2 text-lg text-gray-600">{subambiente.description}</p>

              <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>{artigos.length} artigos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {artigos.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum artigo encontrado
            </h2>
            <p className="text-gray-500">
              Este subambiente ainda não possui artigos cadastrados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artigos.map((artigo) => (
              <div
                key={artigo.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {artigo.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {artigo.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{artigo.blocks?.length || 0} blocos</span>
                  </div>
                </div>

                <Link
                  to={`/artigos/${artigo.id}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Ler artigo
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubambienteDetail;
