// Auth Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse extends User {
  token: string;
}

// Content Types
export interface Ambiente {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  subambientes?: Subambiente[];
}

export interface Subambiente {
  id: number;
  name: string;
  description: string;
  ambienteId: number;
  createdAt: string;
  updatedAt: string;
  artigos?: Artigo[];
  ambiente?: Ambiente;
}

export interface Artigo {
  id: number;
  title: string;
  description: string;
  subambienteId: number;
  createdAt: string;
  updatedAt: string;
  blocks?: Block[];
  subambiente?: Subambiente;
}

// Block Types
export type BlockType = 'TEXTO' | 'IMAGEM' | 'VIDEO';

export interface TextBlock {
  text: string;
  style: {
    fontSize: 'small' | 'medium' | 'large' | 'xlarge';
    textAlign: 'left' | 'center' | 'right' | 'justify';
    fontWeight: 'normal' | 'bold';
    fontStyle: 'normal' | 'italic';
    color: string;
    backgroundColor?: string;
  };
}

export interface ImageBlock {
  url: string;
  alt: string;
  caption?: string;
  style?: {
    width?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
}

export interface VideoBlock {
  url: string;
  title: string;
  duration?: string;
  style?: {
    width?: string;
  };
}

export interface Block {
  id: number;
  type: BlockType;
  order: number;
  content: TextBlock | ImageBlock | VideoBlock;
  artigoId: number;
  createdAt: string;
  updatedAt: string;
}

// Navigation
export interface HeaderData extends Ambiente {
  subambientes: (Subambiente & {
    artigos: Artigo[];
  })[];
}