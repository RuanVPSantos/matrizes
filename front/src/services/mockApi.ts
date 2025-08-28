import {
  mockHeaderData,
  mockAmbientes,
  mockSubambientes,
  mockArtigos,
  mockFavorites,
  mockAuthResponse,
  mockUsers,
  mockAdminUser
} from '../data/mockData';
import { AuthResponse, LoginRequest, RegisterRequest, HeaderData, Ambiente, Subambiente, Artigo, User, Block } from '../types';

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
export const mockApi = {
  // Auth endpoints
  auth: {
    login: async (data: LoginRequest): Promise<{ data: AuthResponse }> => {
      await delay();

      // Simple mock validation
      if (data.email === 'admin@email.com' && data.password === 'admin123') {
        return {
          data: {
            ...mockAdminUser,
            token: 'mock-admin-token-12345'
          }
        };
      }

      if (data.email === 'user@email.com' && data.password === 'user123') {
        return { data: mockAuthResponse };
      }

      throw new Error('Credenciais inválidas');
    },

    register: async (data: RegisterRequest): Promise<{ data: AuthResponse }> => {
      await delay();

      // Mock successful registration
      const newUser = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        role: 'USER' as const,
        blocked: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        token: `mock-token-${Date.now()}`
      };

      return { data: newUser };
    },

    renewToken: async (): Promise<{ data: { token: string } }> => {
      await delay(200);
      return { data: { token: `renewed-token-${Date.now()}` } };
    }
  },

  // Public endpoints
  public: {
    getHeader: async (): Promise<{ data: HeaderData[] }> => {
      await delay();
      return { data: mockHeaderData };
    },

    getAmbientes: async (): Promise<{ data: Ambiente[] }> => {
      await delay();
      return { data: mockAmbientes };
    },

    getAmbiente: async (id: number): Promise<{ data: Ambiente }> => {
      await delay();
      const ambiente = mockAmbientes.find(a => a.id === id);
      if (!ambiente) {
        throw new Error('Ambiente não encontrado');
      }
      return { data: ambiente };
    },

    getSubambientes: async (ambienteId: number): Promise<{ data: Subambiente[] }> => {
      await delay();
      const subambientes = mockSubambientes.filter(s => s.ambienteId === ambienteId);
      return { data: subambientes };
    },

    getArtigos: async (subambienteId: number): Promise<{ data: Artigo[] }> => {
      await delay();
      const artigos = mockArtigos.filter(a => a.subambienteId === subambienteId);
      return { data: artigos };
    },

    getArtigo: async (id: number): Promise<{ data: Artigo }> => {
      await delay();
      const artigo = mockArtigos.find(a => a.id === id);
      if (!artigo) {
        throw new Error('Artigo não encontrado');
      }
      return { data: artigo };
    }
  },

  // User endpoints
  user: {
    getFavorites: async (): Promise<{ data: Artigo[] }> => {
      await delay();
      return { data: mockFavorites };
    },

    addFavorite: async (artigoId: number): Promise<{ data: { message: string } }> => {
      await delay();
      return { data: { message: 'Artigo adicionado aos favoritos' } };
    },

    removeFavorite: async (artigoId: number): Promise<{ data: { message: string } }> => {
      await delay();
      return { data: { message: 'Artigo removido dos favoritos' } };
    },

    markBlockAsRead: async (blockId: number): Promise<{ data: { message: string } }> => {
      await delay(200);
      return { data: { message: 'Bloco marcado como lido' } };
    },

    getReadings: async (artigoId: number): Promise<{ data: number[] }> => {
      await delay();
      // Mock some read blocks
      return { data: [1, 2] };
    }
  },

  // Admin endpoints
  admin: {
    // Ambientes
    createAmbiente: async (data: Partial<Ambiente>): Promise<{ data: Ambiente }> => {
      await delay();
      const newAmbiente: Ambiente = {
        id: Date.now(),
        name: data.name || '',
        description: data.description || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        subambientes: []
      };
      return { data: newAmbiente };
    },

    updateAmbiente: async (id: number, data: Partial<Ambiente>): Promise<{ data: Ambiente }> => {
      await delay();
      const ambiente = mockAmbientes.find(a => a.id === id);
      if (!ambiente) throw new Error('Ambiente não encontrado');

      const updated = { ...ambiente, ...data, updatedAt: new Date().toISOString() };
      return { data: updated };
    },

    deleteAmbiente: async (id: number): Promise<{ data: { message: string } }> => {
      await delay();
      return { data: { message: 'Ambiente removido com sucesso' } };
    },

    // Subambientes
    createSubambiente: async (ambienteId: number, data: Partial<Subambiente>): Promise<{ data: Subambiente }> => {
      await delay();
      const newSubambiente: Subambiente = {
        id: Date.now(),
        name: data.name || '',
        description: data.description || '',
        ambienteId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        artigos: []
      };
      return { data: newSubambiente };
    },

    updateSubambiente: async (id: number, data: Partial<Subambiente>): Promise<{ data: Subambiente }> => {
      await delay();
      const subambiente = mockSubambientes.find(s => s.id === id);
      if (!subambiente) throw new Error('Subambiente não encontrado');

      const updated = { ...subambiente, ...data, updatedAt: new Date().toISOString() };
      return { data: updated };
    },

    deleteSubambiente: async (id: number): Promise<{ data: { message: string } }> => {
      await delay();
      return { data: { message: 'Subambiente removido com sucesso' } };
    },

    // Artigos
    createArtigo: async (subambienteId: number, data: Partial<Artigo>): Promise<{ data: Artigo }> => {
      await delay();
      const newArtigo: Artigo = {
        id: Date.now(),
        title: data.title || '',
        description: data.description || '',
        subambienteId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        blocks: []
      };
      return { data: newArtigo };
    },

    updateArtigo: async (id: number, data: Partial<Artigo>): Promise<{ data: Artigo }> => {
      await delay();
      const artigo = mockArtigos.find(a => a.id === id);
      if (!artigo) throw new Error('Artigo não encontrado');

      const updated = { ...artigo, ...data, updatedAt: new Date().toISOString() };
      return { data: updated };
    },

    deleteArtigo: async (id: number): Promise<{ data: { message: string } }> => {
      await delay();
      return { data: { message: 'Artigo removido com sucesso' } };
    },

    // Blocos
    createBloco: async (artigoId: number, data: Partial<Block>): Promise<{ data: Block }> => {
      await delay();
      const newBloco: Block = {
        id: Date.now(),
        type: data.type || 'TEXTO',
        content: data.content || {
          text: '',
          style: {
            fontSize: 'medium',
            textAlign: 'left',
            fontWeight: 'normal',
            fontStyle: 'normal',
            color: '#000000'
          }
        },
        order: 0,
        artigoId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return { data: newBloco };
    },

    updateBloco: async (id: number, data: Partial<Block>): Promise<{ data: Block }> => {
      await delay();
      const updatedBloco: Block = {
        id,
        type: data.type || 'TEXTO',
        content: data.content || {
          text: '',
          style: {
            fontSize: 'medium',
            textAlign: 'left',
            fontWeight: 'normal',
            fontStyle: 'normal',
            color: '#000000'
          }
        },
        order: data.order || 0,
        artigoId: data.artigoId || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return { data: updatedBloco };
    },

    deleteBloco: async (_id: number): Promise<{ data: { message: string } }> => {

      await delay();
      return { data: { message: 'Bloco removido com sucesso' } };
    },

    reorderBlocos: async (_artigoId: number, _orderList: number[]): Promise<{ data: { message: string } }> => {

      await delay();
      return { data: { message: 'Blocos reordenados com sucesso' } };
    },

    // Usuários
    getUsers: async (): Promise<{ data: User[] }> => {
      await delay();
      // Return mock users
      return { data: mockUsers };
    },

    updateUser: async (id: number, data: Partial<User>): Promise<{ data: User }> => {
      await delay();
      const user = mockUsers.find(u => u.id === id);
      if (!user) throw new Error('Usuário não encontrado');

      const updated = { ...user, ...data, updatedAt: new Date().toISOString() };
      return { data: updated };
    },

    deleteUser: async (id: number): Promise<{ data: { message: string } }> => {
      await delay();
      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) throw new Error('Usuário não encontrado');

      mockUsers.splice(userIndex, 1);
      return { data: { message: 'Usuário removido com sucesso' } };
    },

    blockUser: async (id: number): Promise<{ data: User }> => {
      await delay();
      const user = mockUsers.find(u => u.id === id);
      if (!user) throw new Error('Usuário não encontrado');

      const updated = { ...user, blocked: true, updatedAt: new Date().toISOString() };
      return { data: updated };
    },

    unblockUser: async (id: number): Promise<{ data: User }> => {
      await delay();
      const user = mockUsers.find(u => u.id === id);
      if (!user) throw new Error('Usuário não encontrado');

      const updated = { ...user, blocked: false, updatedAt: new Date().toISOString() };
      return { data: updated };
    }
  }
};