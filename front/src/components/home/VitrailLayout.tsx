import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, FileText } from 'lucide-react';
import { publicApi } from '../../services/api';
import { Ambiente } from '../../types';

interface VitrailSegment {
  ambiente: Ambiente;
  style: React.CSSProperties;
  clipPath: string;
}

const VitrailLayout: React.FC = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [segments, setSegments] = useState<VitrailSegment[]>([]);

  useEffect(() => {
    loadAmbientes();
  }, []);

  useEffect(() => {
    if (ambientes.length > 0) {
      generateSegments();
    }
  }, [ambientes]);

  const loadAmbientes = async () => {
    try {
      const response = await publicApi.getAmbientes();
      setAmbientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar ambientes:', error);
    }
  };

  const generateSegments = () => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    ];

    const newSegments: VitrailSegment[] = ambientes.map((ambiente, index) => {
      const totalAmbientes = ambientes.length;
      let clipPath: string;
      
      if (totalAmbientes === 1) {
        clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      } else if (totalAmbientes === 2) {
        clipPath = index === 0 
          ? 'polygon(0 0, 100% 0, 50% 100%, 0 100%)'
          : 'polygon(50% 100%, 100% 0, 100% 100%)';
      } else if (totalAmbientes === 3) {
        const clipPaths = [
          'polygon(0 0, 100% 0, 50% 50%, 0 100%)',
          'polygon(50% 50%, 100% 0, 100% 100%)',
          'polygon(0 100%, 50% 50%, 100% 100%)'
        ];
        clipPath = clipPaths[index];
      } else if (totalAmbientes === 4) {
        const clipPaths = [
          'polygon(0 0, 50% 0, 50% 50%, 0 50%)',
          'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)',
          'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',
          'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)'
        ];
        clipPath = clipPaths[index];
      } else {
        // Para mais de 4 ambientes, criar divisões diagonais complexas
        const angle = (index * 360 / totalAmbientes) * (Math.PI / 180);
        const x1 = 50 + 50 * Math.cos(angle);
        const y1 = 50 + 50 * Math.sin(angle);
        const x2 = 50 + 50 * Math.cos(angle + (2 * Math.PI / totalAmbientes));
        const y2 = 50 + 50 * Math.sin(angle + (2 * Math.PI / totalAmbientes));
        
        clipPath = `polygon(50% 50%, ${x1}% ${y1}%, ${x2}% ${y2}%)`;
      }

      return {
        ambiente,
        style: {
          background: colors[index % colors.length],
          clipPath,
        },
        clipPath,
      };
    });

    setSegments(newSegments);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {segments.map((segment, index) => (
        <Link
          key={segment.ambiente.id}
          to={`/ambientes/${segment.ambiente.id}`}
          className="absolute inset-0 group cursor-pointer transition-all duration-300 hover:scale-105"
          style={segment.style}
        >
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          
          {/* Content positioned in center of segment */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center text-white transform group-hover:scale-110 transition-transform duration-300">
              <div className="mb-4">
                <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-shadow-lg">
                {segment.ambiente.name}
              </h2>
              
              <p className="text-sm md:text-lg opacity-90 group-hover:opacity-100 transition-opacity mb-6 max-w-sm">
                {segment.ambiente.description}
              </p>
              
              <div className="flex items-center justify-center space-x-4 text-sm opacity-80">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{segment.ambiente.subambientes?.length || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>
                    {segment.ambiente.subambientes?.reduce(
                      (total, sub) => total + (sub.artigos?.length || 0), 0
                    ) || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Gradient overlay for better text readability */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
              clipPath: segment.clipPath,
            }}
          />
        </Link>
      ))}
      
      {ambientes.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <BookOpen className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">Nenhum ambiente encontrado</h2>
            <p className="text-gray-500">Aguarde enquanto carregamos o conteúdo...</p>
          </div>
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-2 h-16 bg-white opacity-20 rounded-full" />
      <div className="absolute top-16 right-12 w-3 h-3 bg-white opacity-30 rounded-full" />
      <div className="absolute bottom-12 left-16 w-4 h-4 bg-white opacity-25 rounded-full" />
      <div className="absolute bottom-8 right-8 w-6 h-2 bg-white opacity-20 rounded-full" />
    </div>
  );
};

export default VitrailLayout;