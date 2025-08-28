import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, ArrowRight } from 'lucide-react';
import { userApi } from '../services/api';
import { Artigo } from '../types';
import Button from '../components/ui/Button';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await userApi.getFavorites();
      setFavorites(response.data);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (artigoId: number) => {
    try {
      await userApi.removeFavorite(artigoId);
      setFavorites(prev => prev.filter(f => f.id !== artigoId));
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Favoritos</h1>
          <p className="text-gray-600">Artigos que você salvou para ler mais tarde</p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((artigo) => (
              <div key={artigo.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {artigo.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {artigo.description}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFavorite(artigo.id)}
                      className="text-red-500 hover:text-red-700 transition-colors ml-2"
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </button>
                  </div>

                  {artigo.subambiente && (
                    <div className="mb-4">
                      <div className="text-xs text-gray-500">
                        {artigo.subambiente.ambiente?.name} → {artigo.subambiente.name}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {new Date(artigo.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    <Link to={`/artigos/${artigo.id}`}>
                      <Button size="sm" variant="outline">
                        <span>Ler</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum favorito ainda</h3>
            <p className="text-gray-500 mb-6">
              Comece a favoritar artigos para vê-los aqui
            </p>
            <Link to="/">
              <Button>
                <BookOpen className="h-4 w-4 mr-2" />
                Explorar Conteúdo
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;