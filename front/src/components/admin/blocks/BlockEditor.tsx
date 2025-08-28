import React, { useState, useEffect, useCallback } from 'react';
import { Block, BlockType, TextBlock, ImageBlock, VideoBlock } from '../../../types';
import { adminApi, publicApi } from '../../../services/api';
import BlockItem from './BlockItem';

interface BlockEditorProps {
  artigoId: number;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ artigoId }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [blockType, setBlockType] = useState<BlockType>('TEXTO');
  const [optimisticBlocks, setOptimisticBlocks] = useState<Set<number>>(new Set());
  const [submittingBlock, setSubmittingBlock] = useState<number | null>(null);
  
  // Form states for different block types
  const [textBlockData, setTextBlockData] = useState<TextBlock>({
    text: '',
    style: {
      fontSize: 'medium',
      textAlign: 'left',
      fontWeight: 'normal',
      fontStyle: 'normal',
      color: '#000000'
    }
  });
  
  const [imageBlockData, setImageBlockData] = useState<ImageBlock>({
    url: '',
    alt: '',
    caption: ''
  });
  
  const [videoBlockData, setVideoBlockData] = useState<VideoBlock>({
    url: '',
    title: ''
  });

  const loadBlocks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await publicApi.getArtigo(artigoId);
      setBlocks(response.data.blocks || []);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar blocos do artigo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [artigoId]);

  useEffect(() => {
    loadBlocks();
  }, [loadBlocks]);

  const handleCreateBlock = () => {
    setEditingBlock(null);
    setBlockType('TEXTO');
    setTextBlockData({
      text: '',
      style: {
        fontSize: 'medium',
        textAlign: 'left',
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: '#000000'
      }
    });
    setImageBlockData({
      url: '',
      alt: '',
      caption: ''
    });
    setVideoBlockData({
      url: '',
      title: ''
    });
    setIsModalOpen(true);
  };

  const handleEditBlock = (block: Block) => {
    setEditingBlock(block);
    setBlockType(block.type);
    
    switch (block.type) {
      case 'TEXTO': {
        const textContent = block.content as TextBlock;
        setTextBlockData({
          text: textContent.text || '',
          style: {
            fontSize: textContent.style?.fontSize || 'medium',
            textAlign: textContent.style?.textAlign || 'left',
            fontWeight: textContent.style?.fontWeight || 'normal',
            fontStyle: textContent.style?.fontStyle || 'normal',
            color: textContent.style?.color || '#000000',
            backgroundColor: textContent.style?.backgroundColor || undefined
          }
        });
        break;
      }
      case 'IMAGEM': {
        const imageContent = block.content as ImageBlock;
        setImageBlockData({
          url: imageContent.url || '',
          alt: imageContent.alt || '',
          caption: imageContent.caption || '',
          style: imageContent.style
        });
        break;
      }
      case 'VIDEO': {
        const videoContent = block.content as VideoBlock;
        setVideoBlockData({
          url: videoContent.url || '',
          title: videoContent.title || '',
          duration: videoContent.duration,
          style: videoContent.style
        });
        break;
      }
    }
    
    setIsModalOpen(true);
  };

  const handleDeleteBlock = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este bloco?')) {
      return;
    }
    
    try {
      await adminApi.deleteBloco(id);
      await loadBlocks();
    } catch (err) {
      setError('Erro ao excluir bloco');
      console.error(err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBlock(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let blockData: Partial<Block>;

      switch (blockType) {
        case 'TEXTO':
          blockData = {
            type: 'TEXTO',
            content: textBlockData
          };
          break;
        case 'IMAGEM':
          blockData = {
            type: 'IMAGEM',
            content: imageBlockData
          };
          break;
        case 'VIDEO':
          blockData = {
            type: 'VIDEO',
            content: videoBlockData
          };
          break;
        default:
          throw new Error('Tipo de bloco inválido');
      }

      if (editingBlock) {
        // Update existing block
        await adminApi.updateBloco(editingBlock.id, blockData);
        await loadBlocks();
        closeModal();
      } else {
        // Create new block with optimistic rendering
        const optimisticId = Date.now() + Math.random(); // Temporary ID
        const optimisticBlock: Block = {
          id: optimisticId,
          type: blockType,
          content: blockData.content!,
          order: blocks.length,
          artigoId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Add optimistic block immediately
        setBlocks(prev => [...prev, optimisticBlock]);
        setOptimisticBlocks(prev => new Set([...prev, optimisticId]));
        setSubmittingBlock(optimisticId);

        // Close modal immediately after adding optimistic block
        closeModal();

        try {
          // Make API call
          const response = await adminApi.createBloco(artigoId, blockData);

          // Replace optimistic block with real block
          setBlocks(prev => prev.map(block =>
            block.id === optimisticId ? response.data : block
          ));
        } catch (apiError) {
          // Remove optimistic block on error
          setBlocks(prev => prev.filter(block => block.id !== optimisticId));
          // Re-open modal to show error
          setIsModalOpen(true);
          throw apiError;
        } finally {
          setOptimisticBlocks(prev => {
            const newSet = new Set(prev);
            newSet.delete(optimisticId);
            return newSet;
          });
          setSubmittingBlock(null);
        }
      }
    } catch (err) {
      setError('Erro ao salvar bloco');
      console.error(err);
    }
  };

  const handleMoveUp = async (id: number) => {
    const blockIndex = blocks.findIndex(b => b.id === id);
    if (blockIndex <= 0) return;

    const newBlocks = [...blocks];
    [newBlocks[blockIndex - 1], newBlocks[blockIndex]] = [newBlocks[blockIndex], newBlocks[blockIndex - 1]];

    // Update order for all blocks
    const orderList = newBlocks.map(b => b.id);
    try {
      await adminApi.reorderBlocos(artigoId, orderList);
      setBlocks(newBlocks);
    } catch (err) {
      setError('Erro ao reordenar blocos');
      console.error(err);
      // Reload blocks to restore original order
      loadBlocks();
    }
  };

  const handleMoveDown = async (id: number) => {
    const blockIndex = blocks.findIndex(b => b.id === id);
    if (blockIndex === -1 || blockIndex >= blocks.length - 1) return;

    const newBlocks = [...blocks];
    [newBlocks[blockIndex], newBlocks[blockIndex + 1]] = [newBlocks[blockIndex + 1], newBlocks[blockIndex]];

    // Update order for all blocks
    const orderList = newBlocks.map(b => b.id);
    try {
      await adminApi.reorderBlocos(artigoId, orderList);
      setBlocks(newBlocks);
    } catch (err) {
      setError('Erro ao reordenar blocos');
      console.error(err);
      // Reload blocks to restore original order
      loadBlocks();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Conteúdo do Artigo</h3>
        <button
          onClick={handleCreateBlock}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Adicionar Bloco
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {blocks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum bloco encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">Comece adicionando um bloco de conteúdo.</p>
          <div className="mt-6">
            <button
              onClick={handleCreateBlock}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Adicionar Bloco
            </button>
          </div>
        </div>
      ) : (
        <div>
          {blocks.map((block, index) => (
            <BlockItem
              key={block.id}
              block={block}
              onEdit={handleEditBlock}
              onDelete={handleDeleteBlock}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              isFirst={index === 0}
              isLast={index === blocks.length - 1}
              isOptimistic={optimisticBlocks.has(block.id)}
              isSubmitting={submittingBlock === block.id}
            />
          ))}
        </div>
      )}

      {/* Block Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingBlock ? 'Editar Bloco' : 'Adicionar Novo Bloco'}
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Bloco</label>
                  <select
                    value={blockType}
                    onChange={(e) => setBlockType(e.target.value as BlockType)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!!editingBlock}
                  >
                    <option value="TEXTO">Texto</option>
                    <option value="IMAGEM">Imagem</option>
                    <option value="VIDEO">Vídeo</option>
                  </select>
                </div>

                {blockType === 'TEXTO' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Texto</label>
                      <textarea
                        value={textBlockData.text}
                        onChange={(e) => setTextBlockData({ ...textBlockData, text: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tamanho da Fonte</label>
                        <select
                          value={textBlockData.style.fontSize}
                          onChange={(e) => setTextBlockData({
                            ...textBlockData,
                            style: { ...textBlockData.style, fontSize: e.target.value as 'small' | 'medium' | 'large' | 'xlarge' }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="small">Pequeno</option>
                          <option value="medium">Grande</option>
                          <option value="large">Muito Grande</option>
                          <option value="xlarge">Enorme</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alinhamento</label>
                        <select
                          value={textBlockData.style.textAlign}
                          onChange={(e) => setTextBlockData({
                            ...textBlockData,
                            style: { ...textBlockData.style, textAlign: e.target.value as 'left' | 'center' | 'right' | 'justify' }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="left">Esquerda</option>
                          <option value="center">Centro</option>
                          <option value="right">Direita</option>
                          <option value="justify">Justificado</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Peso da Fonte</label>
                        <select
                          value={textBlockData.style.fontWeight}
                          onChange={(e) => setTextBlockData({
                            ...textBlockData,
                            style: { ...textBlockData.style, fontWeight: e.target.value as 'normal' | 'bold' }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="normal">Normal</option>
                          <option value="bold">Negrito</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estilo da Fonte</label>
                        <select
                          value={textBlockData.style.fontStyle}
                          onChange={(e) => setTextBlockData({
                            ...textBlockData,
                            style: { ...textBlockData.style, fontStyle: e.target.value as 'normal' | 'italic' }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="normal">Normal</option>
                          <option value="italic">Itálico</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cor do Texto</label>
                        <input
                          type="color"
                          value={textBlockData.style.color}
                          onChange={(e) => setTextBlockData({
                            ...textBlockData,
                            style: { ...textBlockData.style, color: e.target.value }
                          })}
                          className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cor de Fundo</label>
                        <input
                          type="color"
                          value={textBlockData.style.backgroundColor || '#ffffff'}
                          onChange={(e) => setTextBlockData({
                            ...textBlockData,
                            style: { ...textBlockData.style, backgroundColor: e.target.value }
                          })}
                          className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {blockType === 'IMAGEM' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                      <input
                        type="url"
                        value={imageBlockData.url}
                        onChange={(e) => setImageBlockData({ ...imageBlockData, url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Texto Alternativo</label>
                      <input
                        type="text"
                        value={imageBlockData.alt}
                        onChange={(e) => setImageBlockData({ ...imageBlockData, alt: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Legenda</label>
                      <input
                        type="text"
                        value={imageBlockData.caption || ''}
                        onChange={(e) => setImageBlockData({ ...imageBlockData, caption: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alinhamento</label>
                      <select
                        value={imageBlockData.style?.textAlign || 'center'}
                        onChange={(e) => setImageBlockData({
                          ...imageBlockData,
                          style: { ...imageBlockData.style, textAlign: e.target.value as 'left' | 'center' | 'right' }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="left">Esquerda</option>
                        <option value="center">Centro</option>
                        <option value="right">Direita</option>
                      </select>
                    </div>
                  </div>
                )}

                {blockType === 'VIDEO' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL do Vídeo</label>
                      <input
                        type="url"
                        value={videoBlockData.url}
                        onChange={(e) => setVideoBlockData({ ...videoBlockData, url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Título do Vídeo</label>
                      <input
                        type="text"
                        value={videoBlockData.title}
                        onChange={(e) => setVideoBlockData({ ...videoBlockData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockEditor;
