# Prompt Backend – Matrizes

A camada de serviços deve implementar as seguintes funções, agrupadas em domínios.

---

## 1. Autenticação
- **registerUser(data)**  
  - Entrada: `{ name, email, password }`  
  - Saída: Usuário criado (sem senha).  
  - Regras: Cria com role USER por padrão.  

- **loginUser(data)**  
  - Entrada: `{ email, password }`  
  - Saída: `{ token, user }`  
  - Regras: Valida senha, gera JWT.  

- **renewToken(userId)**  
  - Entrada: id do usuário autenticado.  
  - Saída: novo JWT.  

---

## 2. Gerenciamento de Usuários (Admin)
- **getAllUsers()** → lista todos.  
- **getUserById(id)** → retorna 1 usuário.  
- **updateUser(id, data)** → atualiza campos básicos e role.  
- **deleteUser(id)** → remove usuário.  
- **blockUser(id)** → bloqueia usuário (flag `blocked=true`).  
- **unblockUser(id)** → desbloqueia.  

---

## 3. Gerenciamento de Ambientes/Subambientes (Admin)
- **createAmbiente(data)** → cria ambiente.  
- **updateAmbiente(id, data)** → atualiza ambiente.  
- **deleteAmbiente(id)** → remove ambiente e subambientes relacionados.  
- **listAmbientes()** → lista públicos.  

- **createSubambiente(ambienteId, data)** → cria subambiente.  
- **updateSubambiente(id, data)** → atualiza.  
- **deleteSubambiente(id)** → remove.  
- **listSubambientes(ambienteId)** → lista públicos.  

---

## 4. Gerenciamento de Artigos e Blocos (Admin)
- **createArtigo(subambienteId, data)**  
- **updateArtigo(id, data)**  
- **deleteArtigo(id)**  
- **listArtigos(subambienteId)**  

- **createBloco(artigoId, data)**  
  - `data = { type, order, content(JSON) }`  
- **updateBloco(id, data)**  
- **deleteBloco(id)**  
- **reorderBlocos(artigoId, orderList)**  

---

## 5. Favoritos e Leituras (User)
- **addFavorite(userId, artigoId)**  
- **removeFavorite(userId, artigoId)**  
- **listFavorites(userId)**  

- **markBlocoAsRead(userId, blocoId)**  
- **listReadBlocos(userId, artigoId)**  

---

## 6. Consulta Pública (Visitante ou logado)
- **listAmbientes()**  
- **listSubambientes(ambienteId)**  
- **listArtigos(subambienteId)**  
- **getArtigo(artigoId)** com blocos ordenados.  
