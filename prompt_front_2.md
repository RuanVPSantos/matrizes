# Prompt Frontend 2.0 – Matrizes (Versão Aprimorada)

## Telas Principais

### 1. Tela de Login/Registro
- **Inputs**: email, senha, nome (registro)
- **Requests**:
  - `POST /auth/register` → cria usuário
  - `POST /auth/login` → autentica e retorna token
- **Responses**:
  ```json
  // Login Response
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "USER",
    "blocked": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  
  // Register Response
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "USER",
    "blocked": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

---

### 2. Tela Inicial - Navegação Completa
- **Mostra**: Estrutura completa para navegação (ambientes → subambientes → artigos)
- **Request**: `GET /header`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Tecnologia",
      "description": "Ambiente dedicado a conteúdos sobre tecnologia",
      "subambientes": [
        {
          "id": 1,
          "name": "Desenvolvimento Web",
          "description": "Conteúdos sobre desenvolvimento web moderno",
          "artigos": [
            {
              "id": 1,
              "title": "Introdução ao React",
              "description": "Um guia completo para iniciantes"
            },
            {
              "id": 2,
              "title": "Node.js e APIs RESTful",
              "description": "Como criar APIs robustas"
            }
          ]
        }
      ]
    }
  ]
  ```

---

### 3. Tela de Listagem de Ambientes
- **Request**: `GET /ambientes`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Tecnologia",
      "description": "Ambiente dedicado a conteúdos sobre tecnologia",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "subambientes": [...]
    }
  ]
  ```

---

### 4. Tela de Subambientes de um Ambiente
- **Request**: `GET /ambientes/:ambienteId/subambientes`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Desenvolvimento Web",
      "description": "Conteúdos sobre desenvolvimento web moderno",
      "ambienteId": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "artigos": [...]
    }
  ]
  ```

---

### 5. Tela de Artigos de um Subambiente
- **Request**: `GET /subambientes/:subambienteId/artigos`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Introdução ao React",
      "description": "Um guia completo para iniciantes em React",
      "subambienteId": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
  ```

---

### 6. Tela de Exibição de Artigo com Blocos Avançados
- **Mostra**: Blocos em ordem com formatação rica
- **Request**: `GET /artigos/:id`
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Introdução ao React",
    "description": "Um guia completo para iniciantes",
    "subambienteId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "blocks": [
      {
        "id": 1,
        "type": "TEXTO",
        "order": 1,
        "content": {
          "text": "React é uma biblioteca JavaScript para construir interfaces de usuário.",
          "style": {
            "fontSize": "medium",
            "textAlign": "left",
            "fontWeight": "normal",
            "fontStyle": "normal",
            "color": "#000000"
          }
        },
        "artigoId": 1,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      },
      {
        "id": 2,
        "type": "TEXTO",
        "order": 2,
        "content": {
          "text": "Os componentes são a base do React.",
          "style": {
            "fontSize": "large",
            "textAlign": "center",
            "fontWeight": "bold",
            "fontStyle": "normal",
            "color": "#2563eb"
          }
        },
        "artigoId": 1,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      },
      {
        "id": 3,
        "type": "IMAGEM",
        "order": 3,
        "content": {
          "url": "https://example.com/react-diagram.png",
          "alt": "Diagrama de componentes React",
          "caption": "Estrutura básica de componentes React",
          "style": {
            "width": "100%",
            "textAlign": "center"
          }
        },
        "artigoId": 1,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      },
      {
        "id": 4,
        "type": "VIDEO",
        "order": 4,
        "content": {
          "url": "https://example.com/react-tutorial.mp4",
          "title": "Tutorial React Básico",
          "duration": "15:30",
          "style": {
            "width": "100%"
          }
        },
        "artigoId": 1,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

---

### 7. Tela de Favoritos
- **Request**: `GET /favorites` (auth)
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Introdução ao React",
      "description": "Um guia completo para iniciantes",
      "subambienteId": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "subambiente": {
        "id": 1,
        "name": "Desenvolvimento Web",
        "ambiente": {
          "id": 1,
          "name": "Tecnologia"
        }
      }
    }
  ]
  ```

---

### 8. Tela de Administração (Admin)
- **Recursos**: CRUD completo de ambientes, subambientes, artigos, blocos, usuários
- **Funcionalidades especiais**:
  - Reordenação de blocos: `PATCH /artigos/:artigoId/blocos/reorder`
  - Gerenciamento de usuários: `PATCH /users/:id/block` / `PATCH /users/:id/unblock`
  - Formatação avançada de blocos com estilos

---

## Estrutura Avançada de Blocos

### Tipos de Blocos Suportados

#### 1. Bloco de Texto (TEXTO)
```json
{
  "type": "TEXTO",
  "content": {
    "text": "Conteúdo do texto",
    "style": {
      "fontSize": "small|medium|large|xlarge",
      "textAlign": "left|center|right|justify",
      "fontWeight": "normal|bold",
      "fontStyle": "normal|italic",
      "color": "#000000",
      "backgroundColor": "#ffffff"
    }
  }
}
```

#### 2. Bloco de Imagem (IMAGEM)
```json
{
  "type": "IMAGEM",
  "content": {
    "url": "https://example.com/image.jpg",
    "alt": "Texto alternativo",
    "caption": "Legenda da imagem",
    "style": {
      "textAlign": "left|center|right"
    }
  }
}
```

#### 3. Bloco de Vídeo (VIDEO)
```json
{
  "type": "VIDEO",
  "content": {
    "url": "https://example.com/video.mp4",
    "title": "Título do vídeo"
  }
}
```

---

## Fluxos de Caso de Uso Aprimorados

### Fluxo 1 – Autenticação
1. Usuário acessa tela de login
2. Envia `POST /auth/login`
3. Backend retorna objeto completo do usuário + token
4. Token armazenado no localStorage
5. Todas as requisições autenticadas usam `Authorization: Bearer <token>`

### Fluxo 2 – Navegação Inicial Otimizada
1. Usuário acessa página inicial
2. Sistema carrega `GET /header` (estrutura completa)
3. Interface mostra árvore navegável: Ambientes → Subambientes → Artigos
4. Usuário pode navegar diretamente para qualquer artigo

### Fluxo 3 – Leitura de Artigo
1. Usuário abre artigo via `GET /artigos/:id`
2. Sistema carrega blocos **sempre em ordem** (order ASC)
3. Usuário pode marcar blocos como lidos: `POST /readings`
4. Sistema salva progresso de leitura por usuário

### Fluxo 4 – Gerenciamento de Favoritos
1. Usuário logado visualiza artigo
2. Clica em "Favoritar": `POST /favorites`
3. Para remover: `DELETE /favorites`
4. Lista favoritos: `GET /favorites`

### Fluxo 5 – Administração de Conteúdo
1. Admin acessa painel administrativo
2. **Criação de Ambiente**: `POST /ambientes`
3. **Criação de Subambiente**: `POST /ambientes/:id/subambientes`
4. **Criação de Artigo**: `POST /subambientes/:id/artigos`
5. **Criação de Blocos**: `POST /artigos/:id/blocos`
6. **Reordenação de Blocos**: `PATCH /artigos/:id/blocos/reorder`

### Fluxo 6 – Gerenciamento de Usuários (Admin)
1. Admin lista usuários: `GET /users`
2. Visualiza usuário específico: `GET /users/:id`
3. Atualiza dados: `PUT /users/:id`
4. Bloqueia/desbloqueia: `PATCH /users/:id/block` ou `PATCH /users/:id/unblock`
5. Remove usuário: `DELETE /users/:id`

---

## Funcionalidades de Interface Recomendadas

### Para Blocos de Texto
- **Editor rico** com botões para: negrito, itálico, tamanhos, cores, alinhamento
- **Preview em tempo real** da formatação
- **Drag & drop** para reordenação

### Para Blocos de Imagem
- **Upload de arquivos** com preview
- **Redimensionamento** visual
- **Posicionamento** (esquerda, centro, direita)

### Para Blocos de Vídeo
- **Player attached** com iframe do youtube

### Navegação
- **Breadcrumb** mostrando: Ambiente > Subambiente > Artigo
- **Menu lateral** com estrutura completa (do /header)
- **Busca** por artigos
- **Filtros** por ambiente/subambiente

### Funcionalidades do Usuário
- **Dashboard** com favoritos e progresso de leitura
- **Histórico** de artigos lidos
- **Progresso visual** por artigo (blocos lidos/total)

---

## Endpoints de API Completos

### Públicos
- `GET /header` - Estrutura completa para navegação
- `GET /ambientes` - Lista ambientes
- `GET /ambientes/:id/subambientes` - Lista subambientes
- `GET /subambientes/:id/artigos` - Lista artigos
- `GET /artigos/:id` - Artigo com blocos ordenados

### Autenticação
- `POST /auth/register` - Registro
- `POST /auth/login` - Login
- `POST /auth/renew-token` - Renovar token

### Usuário Logado
- `GET /favorites` - Meus favoritos
- `POST /favorites` - Adicionar favorito
- `DELETE /favorites` - Remover favorito
- `POST /readings` - Marcar bloco como lido
- `GET /artigos/:id/readings` - Blocos lidos do artigo

### Admin
- **Usuários**: `GET|PUT|DELETE /users/:id`, `PATCH /users/:id/block|unblock`
- **Ambientes**: `POST|PUT|DELETE /ambientes/:id`
- **Subambientes**: `POST|PUT|DELETE /subambientes/:id`
- **Artigos**: `POST|PUT|DELETE /artigos/:id`
- **Blocos**: `POST|PUT|DELETE /blocos/:id`, `PATCH /artigos/:id/blocos/reorder`
