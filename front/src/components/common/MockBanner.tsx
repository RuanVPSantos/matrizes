import React from 'react';
import { AlertCircle } from 'lucide-react';

const MockBanner: React.FC = () => {
  const isMockMode = import.meta.env.VITE_USE_MOCK === 'true';
  
  if (!isMockMode) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-amber-800">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm font-medium">
          Modo Demonstração - Usando dados mockados
        </span>
        <span className="text-xs bg-amber-100 px-2 py-1 rounded-full">
          Login: user@email.com / user123 ou admin@email.com / admin123
        </span>
      </div>
    </div>
  );
};

export default MockBanner;