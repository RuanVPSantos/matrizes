import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, BookOpen, Clock, User } from 'lucide-react';
import { publicApi, userApi } from '../services/api';
import { Artigo, Block, TextBlock, ImageBlock, VideoBlock } from '../types';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const ArtigoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [readBlocks, setReadBlocks] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadArtigo(parseInt(id));
      if (isAuthenticated) {
        loadReadings(parseInt(id));
      }
    }
  }, [id, isAuthenticated]);

  const loadArtigo = async (artigoId: number) => {
    try {
      console.log('Carregando artigo com ID:', artigoId);
      setLoading(true);
      const response = await publicApi.getArtigo(artigoId);
      console.log('Resposta da API:', response);
      setArtigo(response.data);
    } catch (error) {
      console.error('Erro ao carregar artigo:', error);
      setError('Erro ao carregar artigo');
    } finally {
      setLoading(false);
    }
  };

  const loadReadings = async (artigoId: number) => {
    try {
      const response = await userApi.getReadings(artigoId);
      setReadBlocks(response.data);
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    }
  };

  const handleFavorite = async () => {
    if (!artigo || !isAuthenticated) return;

    try {
      if (isFavorited) {
        await userApi.removeFavorite(artigo.id);
        setIsFavorited(false);
      } else {
        await userApi.addFavorite(artigo.id);
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Erro ao gerenciar favorito:', error);
    }
  };

  const markBlockAsRead = async (blockId: number) => {
    if (!isAuthenticated || readBlocks.includes(blockId)) return;

    try {
      await userApi.markBlockAsRead(blockId);
      setReadBlocks(prev => [...prev, blockId]);
    } catch (error) {
      console.error('Erro ao marcar bloco como lido:', error);
    }
  };

  const renderBlock = (block: Block) => {
    const isRead = readBlocks.includes(block.id);
    
    const blockClass = `transition-all duration-300 ${
      isRead ? 'opacity-75' : 'opacity-100'
    }`;

    switch (block.type) {
      case 'TEXTO': {
        const textContent = block.content as TextBlock;

        // Verificação de segurança para propriedades style
        const style = textContent.style || {};
        const fontSize = style.fontSize === 'small' ? 'text-sm' :
                        style.fontSize === 'medium' ? 'text-xl' :
                        style.fontSize === 'large' ? 'text-4xl' :
                        style.fontSize === 'xlarge' ? 'text-7xl' :
                        'text-base'; // default

        const textAlign = {
          left: 'text-left',
          center: 'text-center',
          right: 'text-right',
          justify: 'text-justify'
        }[style.textAlign || 'left'];

        const fontWeight = style.fontWeight === 'bold' ? 'font-bold' : 'font-normal';
        const fontStyle = style.fontStyle === 'italic' ? 'italic' : 'not-italic';

        return (
          <div
            key={block.id}
            className={`${blockClass} mb-6 p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors`}
            onClick={() => markBlockAsRead(block.id)}
            style={{
              color: style.color || '#000000',
              backgroundColor: style.backgroundColor || 'transparent'
            }}
          >
            <p className={`${fontSize} ${textAlign} ${fontWeight} ${fontStyle} leading-relaxed`}>
              {textContent.text || 'Conteúdo não disponível'}
            </p>
            {isAuthenticated && (
              <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                <div className={`w-2 h-2 rounded-full ${isRead ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>{isRead ? 'Lido' : 'Clique para marcar como lido'}</span>
              </div>
            )}
          </div>
        );
      }

      case 'IMAGEM': {
        const imageContent = block.content as ImageBlock;
        const imageStyle = imageContent.style || {};

        return (
          <div
            key={block.id}
            className={`${blockClass} mb-6 cursor-pointer`}
            onClick={() => markBlockAsRead(block.id)}
          >
            <div className={`${imageStyle.textAlign === 'center' ? 'text-center' : 'text-left'}`}>
              {imageContent.url ? (
                <img
                  src={imageContent.url}
                  alt={imageContent.alt || 'Imagem'}
                  className="rounded-lg shadow-md hover:shadow-lg transition-shadow max-w-full h-auto"
                  style={{
                    width: imageStyle.width || '100%',
                    maxWidth: '800px'
                  }}
                  onLoad={() => console.log('Imagem carregada com sucesso:', imageContent.url)}
                  onError={(e) => {
                    console.error('❌ Erro ao carregar imagem:', imageContent.url);
                    console.error('Block ID:', block.id);
                    console.error('Block data completo:', imageContent);
                    console.error('Event error:', e);
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`hidden text-center p-8 bg-gray-100 rounded-lg ${!imageContent.url ? '' : 'hidden'}`}>
                <div className="text-4xl mb-2">🖼️</div>
                <p className="text-gray-500">Imagem não disponível</p>
                {imageContent.url && (
                  <p className="text-xs text-gray-400 mt-2 break-all">URL: {imageContent.url}</p>
                )}
              </div>
              {imageContent.caption && (
                <p className="mt-2 text-sm text-gray-600 italic">{imageContent.caption}</p>
              )}
            </div>
            {isAuthenticated && (
              <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                <div className={`w-2 h-2 rounded-full ${isRead ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>{isRead ? 'Visualizado' : 'Clique para marcar como visualizado'}</span>
              </div>
            )}
          </div>
        );
      }

      case 'VIDEO': {
        const videoContent = block.content as VideoBlock;

        return (
          <div
            key={block.id}
            className={`${blockClass} mb-6 cursor-pointer`}
            onClick={() => markBlockAsRead(block.id)}
          >
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-lg font-semibold mb-2">{videoContent.title || 'Vídeo'}</h3>
              <p className="text-gray-600 mb-4">Vídeo não disponível no modo demonstração</p>
              {videoContent.duration && (
                <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{videoContent.duration}</span>
                </div>
              )}
            </div>
            {isAuthenticated && (
              <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                <div className={`w-2 h-2 rounded-full ${isRead ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>{isRead ? 'Assistido' : 'Clique para marcar como assistido'}</span>
              </div>
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  if (!artigo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Artigo não encontrado</h2>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  const totalBlocks = artigo.blocks?.length || 0;
  const readBlocksCount = readBlocks.length;
  const progressPercentage = totalBlocks > 0 ? (readBlocksCount / totalBlocks) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar</span>
          </Link>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{artigo.title}</h1>
                <p className="text-lg text-gray-600 mb-4">{artigo.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{totalBlocks} blocos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>Atualizado em {new Date(artigo.updatedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              {isAuthenticated && (
                <Button
                  variant={isFavorited ? "secondary" : "outline"}
                  onClick={handleFavorite}
                  className="ml-4"
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Favoritado' : 'Favoritar'}
                </Button>
              )}
            </div>

            {/* Progress Bar */}
            {isAuthenticated && totalBlocks > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Progresso de leitura</span>
                  <span>{readBlocksCount}/{totalBlocks} blocos ({Math.round(progressPercentage)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {artigo.blocks && artigo.blocks.length > 0 ? (
            <div className="space-y-6">
              {artigo.blocks
                .sort((a, b) => a.order - b.order)
                .map(renderBlock)}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum conteúdo disponível</h3>
              <p className="text-gray-500">Este artigo ainda não possui blocos de conteúdo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtigoDetail;