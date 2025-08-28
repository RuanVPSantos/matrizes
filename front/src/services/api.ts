import axios from 'axios';
import { mockApi } from './mockApi';
import { AuthResponse, LoginRequest, RegisterRequest, HeaderData, Ambiente, Subambiente, Artigo, User, Block } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// If using mock, return mock API
if (USE_MOCK) {
  console.log('🎭 Usando dados mockados - Modo de demonstração ativo');
}

export const authApi = USE_MOCK ? mockApi.auth : {
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data),
  register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/register', data),
  renewToken: () => api.post('/auth/renew-token'),
};

export const publicApi = USE_MOCK ? mockApi.public : {
  getHeader: () => api.get<HeaderData[]>('/header'),
  getAmbientes: () => api.get<Ambiente[]>('/ambientes'),
  getAmbiente: (id: number) => api.get<Ambiente>(`/ambientes/${id}`),
  getSubambientes: (ambienteId: number) => api.get<Subambiente[]>(`/ambientes/${ambienteId}/subambientes`),
  getArtigos: (subambienteId: number) => api.get<Artigo[]>(`/subambientes/${subambienteId}/artigos`),
  getArtigo: (id: number) => api.get<Artigo>(`/artigos/${id}`),
};

export const userApi = USE_MOCK ? mockApi.user : {
  getFavorites: () => api.get<Artigo[]>('/favorites'),
  addFavorite: (artigoId: number) => api.post('/favorites', { artigoId }),
  removeFavorite: (artigoId: number) => api.delete(`/favorites/${artigoId}`),
  markBlockAsRead: (blockId: number) => api.post('/readings', { blockId }),
  getReadings: (artigoId: number) => api.get(`/artigos/${artigoId}/readings`),
};

export const adminApi = USE_MOCK ? mockApi.admin : {
  // Ambientes
  createAmbiente: (data: Partial<Ambiente>) => api.post('/ambientes', data),
  updateAmbiente: (id: number, data: Partial<Ambiente>) => api.put(`/ambientes/${id}`, data),
  deleteAmbiente: (id: number) => api.delete(`/ambientes/${id}`),
  
  // Subambientes
  createSubambiente: (ambienteId: number, data: Partial<Subambiente>) => 
    api.post(`/ambientes/${ambienteId}/subambientes`, data),
  updateSubambiente: (id: number, data: Partial<Subambiente>) => 
    api.put(`/subambientes/${id}`, data),
  deleteSubambiente: (id: number) => api.delete(`/subambientes/${id}`),
  
  // Artigos
  createArtigo: (subambienteId: number, data: Partial<Artigo>) => 
    api.post(`/subambientes/${subambienteId}/artigos`, data),
  updateArtigo: (id: number, data: Partial<Artigo>) => api.put(`/artigos/${id}`, data),
  deleteArtigo: (id: number) => api.delete(`/artigos/${id}`),
  
  // Blocos
  createBloco: (artigoId: number, data: Partial<Block>) => api.post(`/artigos/${artigoId}/blocos`, data),
  updateBloco: (id: number, data: Partial<Block>) => api.put(`/blocos/${id}`, data),
  deleteBloco: (id: number) => api.delete(`/blocos/${id}`),
  reorderBlocos: (artigoId: number, orderList: number[]) => api.patch(`/artigos/${artigoId}/blocos/reorder`, { orderList }),
  
  // Usuários
  getUsers: () => api.get<User[]>('/users'),
  updateUser: (id: number, data: Partial<User>) => api.put(`/users/${id}`, data),
  deleteUser: (id: number) => api.delete(`/users/${id}`),
  blockUser: (id: number) => api.patch(`/users/${id}/block`),
  unblockUser: (id: number) => api.patch(`/users/${id}/unblock`),
};

const defaultApi = USE_MOCK ? { ...mockApi } : api;

export default defaultApi;