# Prompt Frontend – Matrizes

## Telas Principais

### 1. Tela de Login/Registro
- Inputs: email, senha, nome (registro).  
- Requests:
  - `POST /auth/register` → cria usuário.  
  - `POST /auth/login` → autentica e retorna token.  
- Responses:
  ```json
  { "token": "jwt", "user": { "id": 1, "name": "João" } }
  ```

---

### 2. Tela de Listagem de Ambientes
- Mostra todos ambientes (público).  
- Request: `GET /ambientes`  
- Response:
  ```json
  [{ "id": 1, "name": "Matemática" }]
  ```

---

### 3. Tela de Subambientes de um Ambiente
- Request: `GET /ambientes/:id/subambientes`  
- Response:
  ```json
  [{ "id": 10, "name": "Álgebra" }]
  ```

---

### 4. Tela de Artigos de um Subambiente
- Request: `GET /subambientes/:id/artigos`  
- Response:
  ```json
  [{ "id": 100, "title": "Equações de 2º grau" }]
  ```

---

### 5. Tela de Exibição de Artigo
- Mostra blocos em ordem.  
- Request: `GET /artigos/:id`  
- Response:
  ```json
  {
    "id": 100,
    "title": "Equações",
    "blocks": [
      { "id": 1, "type": "TEXTO", "order": 1, "content": { "text": "ax²+bx+c=0", "style": { "color": "red" } } },
      { "id": 2, "type": "IMAGEM", "order": 2, "content": { "url": "https://..." } }
    ]
  }
  ```

---

### 6. Tela de Favoritos
- Request: `GET /users/:id/favorites` (auth)  
- Response:
  ```json
  [{ "artigoId": 100, "title": "Equações" }]
  ```

---

### 7. Tela de Administração (apenas admin)
- CRUD de ambientes, subambientes, artigos, blocos, usuários.  
- Exemplos:
  - `POST /ambientes`  
  - `PUT /artigos/:id`  
  - `DELETE /users/:id`

---

## Fluxos de Caso de Uso

### Fluxo 1 – Autenticação
1. Usuário acessa tela de login.  
2. Envia `POST /auth/login`.  
3. Backend retorna `{ token, user }`.  
4. Token armazenado no localStorage e usado no `Authorization: Bearer`.  

---

### Fluxo 2 – Navegação Pública
1. Visitante abre tela inicial (`GET /ambientes`).  
2. Clica em um ambiente → carrega subambientes.  
3. Escolhe subambiente → carrega artigos.  
4. Abre artigo → carrega blocos.  

---

### Fluxo 3 – Usuário Normal
1. Logado abre artigo.  
2. Clica em "Favoritar" → `POST /favorites`.  
3. Marca bloco como lido → `POST /readings`.  
4. Pode ver seus favoritos/lidos em tela dedicada.  

---

### Fluxo 4 – Administração
1. Admin logado acessa painel.  
2. Cria ambiente (`POST /ambientes`).  
3. Cria subambiente (`POST /subambientes`).  
4. Cria artigo (`POST /artigos`).  
5. Cria blocos (`POST /blocos`).  
