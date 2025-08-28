import { HeaderData, Ambiente, Subambiente, Artigo, User, AuthResponse } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    role: "USER",
    blocked: false,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    role: "ADMIN",
    blocked: false,
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z"
  }
];

// Mock Articles with Blocks
export const mockArtigos: Artigo[] = [
  {
    id: 1,
    title: "Introdução ao React",
    description: "Um guia completo para iniciantes em React",
    subambienteId: 1,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    blocks: [
      {
        id: 1,
        type: "TEXTO",
        order: 1,
        content: {
          text: "React é uma biblioteca JavaScript para construir interfaces de usuário. Desenvolvida pelo Facebook, ela revolucionou a forma como criamos aplicações web modernas.",
          style: {
            fontSize: "medium",
            textAlign: "left",
            fontWeight: "normal",
            fontStyle: "normal",
            color: "#000000"
          }
        },
        artigoId: 1,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z"
      },
      {
        id: 2,
        type: "TEXTO",
        order: 2,
        content: {
          text: "Os componentes são a base do React",
          style: {
            fontSize: "large",
            textAlign: "center",
            fontWeight: "bold",
            fontStyle: "normal",
            color: "#2563eb"
          }
        },
        artigoId: 1,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z"
      },
      {
        id: 3,
        type: "IMAGEM",
        order: 3,
        content: {
          url: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Diagrama de componentes React",
          caption: "Estrutura básica de componentes React",
          style: {
            width: "100%",
            textAlign: "center"
          }
        },
        artigoId: 1,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z"
      },
      {
        id: 4,
        type: "TEXTO",
        order: 4,
        content: {
          text: "Para começar com React, você precisa entender alguns conceitos fundamentais: JSX, Props, State e Hooks. Estes são os pilares que sustentam toda aplicação React moderna.",
          style: {
            fontSize: "medium",
            textAlign: "justify",
            fontWeight: "normal",
            fontStyle: "normal",
            color: "#374151"
          }
        },
        artigoId: 1,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z"
      }
    ]
  },
  {
    id: 2,
    title: "Node.js e APIs RESTful",
    description: "Como criar APIs robustas com Node.js",
    subambienteId: 1,
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
    blocks: [
      {
        id: 5,
        type: "TEXTO",
        order: 1,
        content: {
          text: "Node.js permite executar JavaScript no servidor, abrindo possibilidades infinitas para desenvolvimento backend.",
          style: {
            fontSize: "medium",
            textAlign: "left",
            fontWeight: "normal",
            fontStyle: "normal",
            color: "#000000"
          }
        },
        artigoId: 2,
        createdAt: "2024-01-02T00:00:00.000Z",
        updatedAt: "2024-01-02T00:00:00.000Z"
      },
      {
        id: 6,
        type: "IMAGEM",
        order: 2,
        content: {
          url: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Código Node.js",
          caption: "Exemplo de código Node.js",
          style: {
            width: "80%",
            textAlign: "center"
          }
        },
        artigoId: 2,
        createdAt: "2024-01-02T00:00:00.000Z",
        updatedAt: "2024-01-02T00:00:00.000Z"
      }
    ]
  },
  {
    id: 3,
    title: "Fundamentos de Python",
    description: "Aprenda os conceitos básicos da linguagem Python",
    subambienteId: 2,
    createdAt: "2024-01-03T00:00:00.000Z",
    updatedAt: "2024-01-03T00:00:00.000Z",
    blocks: [
      {
        id: 7,
        type: "TEXTO",
        order: 1,
        content: {
          text: "Python é uma linguagem de programação de alto nível, interpretada e de propósito geral.",
          style: {
            fontSize: "medium",
            textAlign: "left",
            fontWeight: "normal",
            fontStyle: "normal",
            color: "#000000"
          }
        },
        artigoId: 3,
        createdAt: "2024-01-03T00:00:00.000Z",
        updatedAt: "2024-01-03T00:00:00.000Z"
      }
    ]
  },
  {
    id: 4,
    title: "Introdução ao Machine Learning",
    description: "Conceitos fundamentais de aprendizado de máquina",
    subambienteId: 2,
    createdAt: "2024-01-04T00:00:00.000Z",
    updatedAt: "2024-01-04T00:00:00.000Z",
    blocks: [
      {
        id: 8,
        type: "TEXTO",
        order: 1,
        content: {
          text: "Machine Learning é um subcampo da inteligência artificial que permite aos computadores aprender sem serem explicitamente programados.",
          style: {
            fontSize: "medium",
            textAlign: "left",
            fontWeight: "normal",
            fontStyle: "normal",
            color: "#000000"
          }
        },
        artigoId: 4,
        createdAt: "2024-01-04T00:00:00.000Z",
        updatedAt: "2024-01-04T00:00:00.000Z"
      }
    ]
  },
  {
    id: 5,
    title: "Álgebra Linear Aplicada",
    description: "Conceitos de álgebra linear para ciência de dados",
    subambienteId: 3,
    createdAt: "2024-01-05T00:00:00.000Z",
    updatedAt: "2024-01-05T00:00:00.000Z",
    blocks: [
      {
        id: 9,
        type: "TEXTO",
        order: 1,
        content: {
          text: "A álgebra linear é fundamental para entender algoritmos de machine learning e processamento de dados.",
          style: {
            fontSize: "medium",
            textAlign: "left",
            fontWeight: "normal",
            fontStyle: "normal",
            color: "#000000"
          }
        },
        artigoId: 5,
        createdAt: "2024-01-05T00:00:00.000Z",
        updatedAt: "2024-01-05T00:00:00.000Z"
      }
    ]
  },
  {
    id: 6,
    title: "Cálculo Diferencial",
    description: "Fundamentos do cálculo diferencial",
    subambienteId: 3,
    createdAt: "2024-01-06T00:00:00.000Z",
    updatedAt: "2024-01-06T00:00:00.000Z",
    blocks: [
      {
        id: 10,
        type: "TEXTO",
        order: 1,
        content: {
          text: "O cálculo diferencial estuda as taxas de variação e é essencial para otimização em algoritmos.",
          style: {
            fontSize: "medium",
            textAlign: "left",
            fontWeight: "normal",
            fontStyle: "normal",
            color: "#000000"
          }
        },
        artigoId: 6,
        createdAt: "2024-01-06T00:00:00.000Z",
        updatedAt: "2024-01-06T00:00:00.000Z"
      }
    ]
  },
  {
    id: 7,
    title: "Introdução ao Design Thinking",
    description: "Metodologia centrada no usuário para inovação",
    subambienteId: 4,
    createdAt: "2024-01-07T00:00:00.000Z",
    updatedAt: "2024-01-07T00:00:00.000Z",
    blocks: [
      {
        id: 11,
        type: "TEXTO",
        order: 1,
        content: {
          text: "Design Thinking é uma abordagem centrada no ser humano para inovação que integra as necessidades das pessoas.",
          style: {
            fontSize: "medium",
            textAlign: "left",
            fontWeight: "normal",
            fontStyle: "normal",
            color: "#000000"
          }
        },
        artigoId: 7,
        createdAt: "2024-01-07T00:00:00.000Z",
        updatedAt: "2024-01-07T00:00:00.000Z"
      }
    ]
  },
  {
    id: 8,
    title: "Prototipagem Rápida",
    description: "Técnicas para criar protótipos eficientes",
    subambienteId: 4,
    createdAt: "2024-01-08T00:00:00.000Z",
    updatedAt: "2024-01-08T00:00:00.000Z",
    blocks: [
      {
        id: 12,
        type: "TEXTO",
        order: 1,
        content: {
          text: "A prototipagem rápida permite testar ideias rapidamente e iterar com base no feedback dos usuários.",
          style: {
            fontSize: "medium",
            textAlign: "left",
            fontWeight: "normal",
            fontStyle: "normal",
            color: "#000000"
          }
        },
        artigoId: 8,
        createdAt: "2024-01-08T00:00:00.000Z",
        updatedAt: "2024-01-08T00:00:00.000Z"
      }
    ]
  }
];

// Mock Subambientes
export const mockSubambientes: Subambiente[] = [
  {
    id: 1,
    name: "Desenvolvimento Web",
    description: "Conteúdos sobre desenvolvimento web moderno",
    ambienteId: 1,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    artigos: mockArtigos.filter(a => a.subambienteId === 1)
  },
  {
    id: 2,
    name: "Ciência de Dados",
    description: "Python, Machine Learning e análise de dados",
    ambienteId: 1,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    artigos: mockArtigos.filter(a => a.subambienteId === 2)
  },
  {
    id: 3,
    name: "Matemática Aplicada",
    description: "Conceitos matemáticos para tecnologia",
    ambienteId: 2,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    artigos: mockArtigos.filter(a => a.subambienteId === 3)
  },
  {
    id: 4,
    name: "Design e UX",
    description: "Design centrado no usuário e experiência",
    ambienteId: 3,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    artigos: mockArtigos.filter(a => a.subambienteId === 4)
  }
];

// Mock Ambientes
export const mockAmbientes: Ambiente[] = [
  {
    id: 1,
    name: "Tecnologia",
    description: "Ambiente dedicado a conteúdos sobre tecnologia e programação",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    subambientes: mockSubambientes.filter(s => s.ambienteId === 1)
  },
  {
    id: 2,
    name: "Matemática",
    description: "Conceitos matemáticos fundamentais e aplicados",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    subambientes: mockSubambientes.filter(s => s.ambienteId === 2)
  },
  {
    id: 3,
    name: "Design",
    description: "Design, UX/UI e metodologias criativas",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    subambientes: mockSubambientes.filter(s => s.ambienteId === 3)
  },
  {
    id: 4,
    name: "Negócios",
    description: "Estratégia, empreendedorismo e gestão",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    subambientes: []
  }
];

// Mock Header Data
export const mockHeaderData: HeaderData[] = mockAmbientes.map(ambiente => ({
  ...ambiente,
  subambientes: ambiente.subambientes?.map(sub => ({
    ...sub,
    artigos: sub.artigos || []
  })) || []
}));

// Mock Favorites
export const mockFavorites: Artigo[] = [
  {
    ...mockArtigos[0],
    subambiente: {
      id: 1,
      name: "Desenvolvimento Web",
      description: "Conteúdos sobre desenvolvimento web moderno",
      ambienteId: 1,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      ambiente: {
        id: 1,
        name: "Tecnologia",
        description: "Ambiente dedicado a conteúdos sobre tecnologia",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z"
      }
    }
  }
];

// Mock Auth Response
export const mockAuthResponse: AuthResponse = {
  ...mockUsers[0],
  token: "mock-jwt-token-12345"
};

// Mock Admin User
export const mockAdminUser: User = mockUsers[1];