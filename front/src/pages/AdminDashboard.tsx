import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import EnvironmentManagement from '../components/admin/EnvironmentManagement';
import SubenvironmentManagement from '../components/admin/SubenvironmentManagement';
import ArticleManagement from '../components/admin/ArticleManagement';
import UserManagement from '../components/admin/UserManagement';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'environments' | 'subenvironments' | 'articles' | 'users'>('environments');

  // Check if user is admin
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
          <p className="mt-2 text-gray-600">Gerencie ambientes, subambientes, artigos e usuários</p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('environments')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'environments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ambientes
              </button>
              <button
                onClick={() => setActiveTab('subenvironments')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'subenvironments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Subambientes
              </button>
              <button
                onClick={() => setActiveTab('articles')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'articles'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Artigos
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Usuários
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'environments' && (
              <EnvironmentManagement />
            )}

            {activeTab === 'subenvironments' && (
              <SubenvironmentManagement />
            )}

            {activeTab === 'articles' && (
              <ArticleManagement />
            )}

            {activeTab === 'users' && (
              <UserManagement />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
