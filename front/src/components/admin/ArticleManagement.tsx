import React, { useState, useEffect } from 'react';
import { adminApi, publicApi } from '../../services/api';
import { Ambiente, Subambiente, Artigo } from '../../types';

const ArticleManagement: React.FC = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [selectedAmbiente, setSelectedAmbiente] = useState<number | ''>('');
  const [subambientes, setSubambientes] = useState<Subambiente[]>([]);
  const [selectedSubambiente, setSelectedSubambiente] = useState<number | ''>('');
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArtigo, setEditingArtigo] = useState<Artigo | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subambienteId: ''
  });

  useEffect(() => {
    loadAmbientes();
  }, []);

  useEffect(() => {
    if (selectedAmbiente) {
      loadSubambientes(Number(selectedAmbiente));
    } else {
      setSubambientes([]);
      setSelectedSubambiente('');
      setArtigos([]);
    }
  }, [selectedAmbiente]);

  useEffect(() => {
    if (selectedSubambiente) {
      loadArtigos(Number(selectedSubambiente));
    } else {
      setArtigos([]);
    }
  }, [selectedSubambiente]);

  const loadAmbientes = async () => {
    try {
      setLoading(true);
      const response = await publicApi.getAmbientes();
      setAmbientes(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar ambientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSubambientes = async (ambienteId: number) => {
    try {
      const response = await publicApi.getSubambientes(ambienteId);
      setSubambientes(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar subambientes');
      console.error(err);
    }
  };

  const loadArtigos = async (subambienteId: number) => {
    try {
      setLoading(true);
      const response = await publicApi.getArtigos(subambienteId);
      setArtigos(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar artigos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingArtigo) {
        // Update existing artigo
        await adminApi.updateArtigo(editingArtigo.id, {
          title: formData.title,
          description: formData.description
        });
      } else {
        // Create new artigo
        const subambienteId = Number(formData.subambienteId);
        await adminApi.createArtigo(subambienteId, {
          title: formData.title,
          description: formData.description
        });
      }
      if (selectedSubambiente) {
        await loadArtigos(Number(selectedSubambiente));
      }
      closeModal();
    } catch (err) {
      setError('Erro ao salvar artigo');
      console.error(err);
    }
  };

  const handleEdit = (artigo: Artigo) => {
    setEditingArtigo(artigo);
    setFormData({
      title: artigo.title,
      description: artigo.description,
      subambienteId: artigo.subambienteId.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este artigo?')) {
      return;
    }
    
    try {
      await adminApi.deleteArtigo(id);
      if (selectedSubambiente) {
        await loadArtigos(Number(selectedSubambiente));
      }
    } catch (err) {
      setError('Erro ao excluir artigo');
      console.error(err);
    }
  };

  const openModal = () => {
    setEditingArtigo(null);
    setFormData({
      title: '',
      description: '',
      subambienteId: selectedSubambiente.toString()
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingArtigo(null);
  };

  if (loading && ambientes.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gerenciamento de Artigos</h2>
        <button 
          onClick={openModal}
          disabled={!selectedSubambiente}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            selectedSubambiente 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Novo Artigo
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="ambiente" className="block text-sm font-medium text-gray-700 mb-1">
            Selecionar Ambiente
          </label>
          <select
            id="ambiente"
            value={selectedAmbiente}
            onChange={(e) => setSelectedAmbiente(e.target.value as number | '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um ambiente</option>
            {ambientes.map((ambiente) => (
              <option key={ambiente.id} value={ambiente.id}>
                {ambiente.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subambiente" className="block text-sm font-medium text-gray-700 mb-1">
            Selecionar Subambiente
          </label>
          <select
            id="subambiente"
            value={selectedSubambiente}
            onChange={(e) => setSelectedSubambiente(e.target.value as number | '')}
            disabled={!selectedAmbiente}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um subambiente</option>
            {subambientes.map((subambiente) => (
              <option key={subambiente.id} value={subambiente.id}>
                {subambiente.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedSubambiente && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <ul className="divide-y divide-gray-200">
            {artigos.map((artigo) => (
              <li key={artigo.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{artigo.title}</h3>
                    <p className="text-gray-500">{artigo.description}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Criado em: {new Date(artigo.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(artigo)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(artigo.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!selectedSubambiente && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">Selecione um subambiente para gerenciar seus artigos</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingArtigo ? 'Editar Artigo' : 'Novo Artigo'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              {!editingArtigo && (
                <>
                  <div className="mb-4">
                    <label htmlFor="ambienteId" className="block text-sm font-medium text-gray-700 mb-1">
                      Ambiente
                    </label>
                    <select
                      id="ambienteId"
                      value={selectedAmbiente}
                      onChange={(e) => setSelectedAmbiente(e.target.value as number | '')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Selecione um ambiente</option>
                      {ambientes.map((ambiente) => (
                        <option key={ambiente.id} value={ambiente.id}>
                          {ambiente.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subambienteId" className="block text-sm font-medium text-gray-700 mb-1">
                      Subambiente
                    </label>
                    <select
                      id="subambienteId"
                      name="subambienteId"
                      value={formData.subambienteId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={!selectedAmbiente}
                    >
                      <option value="">Selecione um subambiente</option>
                      {subambientes.map((subambiente) => (
                        <option key={subambiente.id} value={subambiente.id}>
                          {subambiente.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
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
      )}
    </div>
  );
};

export default ArticleManagement;
