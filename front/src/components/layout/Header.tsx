import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, Heart, Settings, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { publicApi } from '../../services/api';
import { HeaderData } from '../../types';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [headerData, setHeaderData] = useState<HeaderData[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    loadHeaderData();
  }, []);

  const loadHeaderData = async () => {
    try {
      const response = await publicApi.getHeader();
      setHeaderData(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados do header:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleDropdown = (ambienteId: number) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [ambienteId]: !prev[ambienteId]
    }));
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">StudyPlatform</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {headerData.map((ambiente) => (
              <div key={ambiente.id} className="relative group">
                <button
                  onClick={() => toggleDropdown(ambiente.id)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  <span>{ambiente.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* Dropdown */}
                <div className={`absolute top-full left-0 mt-1 w-96 bg-white rounded-lg shadow-xl border transform transition-all duration-200 ${
                  openDropdowns[ambiente.id] ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">{ambiente.name}</h3>
                    <div className="space-y-3">
                      {ambiente.subambientes?.map((subambiente) => (
                        <div key={subambiente.id}>
                          <Link
                            to={`/ambientes/${ambiente.id}/subambientes/${subambiente.id}`}
                            className="block font-medium text-gray-800 hover:text-blue-600 transition-colors"
                          >
                            {subambiente.name}
                          </Link>
                          {subambiente.artigos && subambiente.artigos.length > 0 && (
                            <div className="ml-4 mt-1 space-y-1">
                              {subambiente.artigos.slice(0, 3).map((artigo) => (
                                <Link
                                  key={artigo.id}
                                  to={`/artigos/${artigo.id}`}
                                  className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                  {artigo.title}
                                </Link>
                              ))}
                              {subambiente.artigos.length > 3 && (
                                <Link
                                  to={`/ambientes/${ambiente.id}/subambientes/${subambiente.id}`}
                                  className="block text-sm text-blue-600 hover:underline"
                                >
                                  Ver todos ({subambiente.artigos.length})
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/favorites" className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:block">{user?.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      {user?.role === 'ADMIN' && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Administração</span>
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sair</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link to="/register">
                  <Button>Cadastrar</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {headerData.map((ambiente) => (
                <div key={ambiente.id}>
                  <button
                    onClick={() => toggleDropdown(ambiente.id)}
                    className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-600 py-2"
                  >
                    <span>{ambiente.name}</span>
                    <ChevronDown className={`h-4 w-4 transform transition-transform ${
                      openDropdowns[ambiente.id] ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {openDropdowns[ambiente.id] && ambiente.subambientes && (
                    <div className="ml-4 mt-2 space-y-2">
                      {ambiente.subambientes.map((subambiente) => (
                        <div key={subambiente.id}>
                          <Link
                            to={`/ambientes/${ambiente.id}/subambientes/${subambiente.id}`}
                            className="block text-gray-800 hover:text-blue-600 py-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subambiente.name}
                          </Link>
                          {subambiente.artigos && (
                            <div className="ml-4 space-y-1">
                              {subambiente.artigos.slice(0, 2).map((artigo) => (
                                <Link
                                  key={artigo.id}
                                  to={`/artigos/${artigo.id}`}
                                  className="block text-sm text-gray-600 hover:text-blue-600 py-1"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {artigo.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;