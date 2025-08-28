import React, { useState, useEffect } from 'react';
import { adminApi, publicApi } from '../../services/api';
import { Ambiente, Subambiente } from '../../types';

const SubenvironmentManagement: React.FC = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [selectedAmbiente, setSelectedAmbiente] = useState<number | ''>('');
  const [subambientes, setSubambientes] = useState<Subambiente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubambiente, setEditingSubambiente] = useState<Subambiente | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ambienteId: ''
  });

  useEffect(() => {
    loadAmbientes();
  }, []);

  useEffect(() => {
    if (selectedAmbiente) {
      loadSubambientes(Number(selectedAmbiente));
    } else {
      setSubambientes([]);
    }
  }, [selectedAmbiente]);

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
      setLoading(true);
      const response = await publicApi.getSubambientes(ambienteId);
      setSubambientes(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar subambientes');
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
      if (editingSubambiente) {
        // Update existing subambiente
        await adminApi.updateSubambiente(editingSubambiente.id, {
          name: formData.name,
          description: formData.description
        });
      } else {
        // Create new subambiente
        const ambienteId = Number(formData.ambienteId);
        await adminApi.createSubambiente(ambienteId, {
          name: formData.name,
          description: formData.description
        });
      }
      if (selectedAmbiente) {
        await loadSubambientes(Number(selectedAmbiente));
      }
      closeModal();
    } catch (err) {
      setError('Erro ao salvar subambiente');
      console.error(err);
    }
  };

  const handleEdit = (subambiente: Subambiente) => {
    setEditingSubambiente(subambiente);
    setFormData({
      name: subambiente.name,
      description: subambiente.description,
      ambienteId: subambiente.ambienteId.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este subambiente?')) {
      return;
    }
    
    try {
      await adminApi.deleteSubambiente(id);
      if (selectedAmbiente) {
        await loadSubambientes(Number(selectedAmbiente));
      }
    } catch (err) {
      setError('Erro ao excluir subambiente');
      console.error(err);
    }
  };

  const openModal = () => {
    setEditingSubambiente(null);
    setFormData({
      name: '',
      description: '',
      ambienteId: selectedAmbiente.toString()
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSubambiente(null);
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
        <h2 className="text-xl font-semibold text-gray-800">Gerenciamento de Subambientes</h2>
        <button 
          onClick={openModal}
          disabled={!selectedAmbiente}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            selectedAmbiente 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Novo Subambiente
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="ambiente" className="block text-sm font-medium text-gray-700 mb-1">
          Selecionar Ambiente
        </label>
        <select
          id="ambiente"
          value={selectedAmbiente}
          onChange={(e) => setSelectedAmbiente(e.target.value as number | '')}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione um ambiente</option>
          {ambientes.map((ambiente) => (
            <option key={ambiente.id} value={ambiente.id}>
              {ambiente.name}
            </option>
          ))}
        </select>
      </div>

      {selectedAmbiente && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <ul className="divide-y divide-gray-200">
            {subambientes.map((subambiente) => (
              <li key={subambiente.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{subambiente.name}</h3>
                    <p className="text-gray-500">{subambiente.description}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {subambiente.artigos?.length || 0} artigos
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(subambiente)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(subambiente.id)}
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

      {!selectedAmbiente && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">Selecione um ambiente para gerenciar seus subambientes</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingSubambiente ? 'Editar Subambiente' : 'Novo Subambiente'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              {!editingSubambiente && (
                <div className="mb-4">
                  <label htmlFor="ambienteId" className="block text-sm font-medium text-gray-700 mb-1">
                    Ambiente
                  </label>
                  <select
                    id="ambienteId"
                    name="ambienteId"
                    value={formData.ambienteId}
                    onChange={handleInputChange}
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
              )}
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
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

export default SubenvironmentManagement;
