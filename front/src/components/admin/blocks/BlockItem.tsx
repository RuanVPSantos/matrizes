import React from 'react';
import { Block, TextBlock, ImageBlock, VideoBlock } from '../../../types';

interface BlockItemProps {
  block: Block;
  onEdit: (block: Block) => void;
  onDelete: (id: number) => void;
  onMoveUp: (id: number) => void;
  onMoveDown: (id: number) => void;
  isFirst: boolean;
  isLast: boolean;
  isOptimistic?: boolean;
  isSubmitting?: boolean;
}

const BlockItem: React.FC<BlockItemProps> = ({ 
  block, 
  onEdit, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  isFirst, 
  isLast,
  isOptimistic = false,
  isSubmitting = false
}) => {

  const renderBlockContent = () => {
    switch (block.type) {
      case 'TEXTO': {
        const textContent = block.content as TextBlock;
        return (
          <div 
            className="p-4"
            style={{
              fontSize: textContent.style?.fontSize === 'small' ? '0.875rem' : // text-sm
                       textContent.style?.fontSize === 'medium' ? '1.25rem' : // text-xl (era text-base)
                       textContent.style?.fontSize === 'large' ? '2.25rem' : // text-4xl (era text-lg)
                       textContent.style?.fontSize === 'xlarge' ? '4.5rem' : // text-7xl (era text-xl)
                       '1rem', // default text-base
              textAlign: textContent.style?.textAlign || 'left',
              fontWeight: textContent.style?.fontWeight || 'normal',
              fontStyle: textContent.style?.fontStyle || 'normal',
              color: textContent.style?.color || '#000000',
              backgroundColor: textContent.style?.backgroundColor || 'transparent'
            }}
          >
            {textContent.text}
          </div>
        );
      }
      case 'IMAGEM': {
        const imageContent = block.content as ImageBlock;
        return (
          <div className="p-4 text-center">
            {imageContent.url ? (
              <img 
                src={imageContent.url} 
                alt={imageContent.alt || ''} 
                className="max-w-full h-auto mx-auto rounded-lg shadow-md hover:shadow-lg transition-shadow"
                style={{
                  width: imageContent.style?.width || '100%',
                  maxWidth: '600px'
                }}
                onError={(e) => {
                  console.error('Erro ao carregar imagem no editor:', imageContent.url);
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`hidden text-center p-6 bg-gray-100 rounded-lg ${!imageContent.url ? '' : 'hidden'}`}>
              <div className="text-3xl mb-2">🖼️</div>
              <p className="text-gray-500 text-sm">Imagem não disponível</p>
              {imageContent.url && (
                <p className="text-xs text-gray-400 mt-2 break-all">URL: {imageContent.url}</p>
              )}
            </div>
            {imageContent.caption && (
              <p className="text-sm text-gray-600 mt-2">{imageContent.caption}</p>
            )}
          </div>
        );
      }
      case 'VIDEO': {
        const videoContent = block.content as VideoBlock;
        return (
          <div className="p-4">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={videoContent.url}
                title={videoContent.title}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {videoContent.title && (
              <p className="text-sm text-gray-600 mt-2">{videoContent.title}</p>
            )}
          </div>
        );
      }
      default:
        return <div className="p-4">Tipo de bloco não suportado</div>;
    }
  };

  return (
    <div 
      className={`border border-gray-200 rounded-lg mb-4 bg-white shadow-sm hover:shadow-md transition-all duration-200 ${
        isOptimistic ? 'border-blue-300 bg-blue-50' : ''
      } ${isSubmitting ? 'opacity-75' : ''}`}
      >
      <div className="flex justify-between items-center p-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {block.type}
          </span>
          {isOptimistic && (
            <div className="flex items-center space-x-1 text-blue-600">
              <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-600"></div>
              <span className="text-xs">Criando...</span>
            </div>
          )}
          {isSubmitting && (
            <div className="flex items-center space-x-1 text-orange-600">
              <div className="animate-spin rounded-full h-3 w-3 border-b border-orange-600"></div>
              <span className="text-xs">Salvando...</span>
            </div>
          )}
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => onMoveUp(block.id)}
            disabled={isFirst || isOptimistic || isSubmitting}
            className={`p-1 rounded ${isFirst || isOptimistic || isSubmitting ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Mover para cima"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={() => onMoveDown(block.id)}
            disabled={isLast || isOptimistic || isSubmitting}
            className={`p-1 rounded ${isLast || isOptimistic || isSubmitting ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Mover para baixo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={() => onEdit(block)}
            disabled={isOptimistic || isSubmitting}
            className={`p-1 rounded ${isOptimistic || isSubmitting ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Editar bloco"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(block.id)}
            disabled={isOptimistic || isSubmitting}
            className={`p-1 rounded ${isOptimistic || isSubmitting ? 'text-gray-300 cursor-not-allowed' : 'text-red-600 hover:bg-red-100'}`}
            title="Excluir bloco"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      {renderBlockContent()}
    </div>
  );
};

export default BlockItem;
