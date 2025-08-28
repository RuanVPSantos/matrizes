# Descrição Geral do Projeto – Matrizes (Prompt)

O sistema **Matrizes** é uma plataforma de gestão de conteúdos estruturados em **ambientes, subambientes e artigos**. Seu objetivo é organizar disciplinas (ambientes), subdividi-las (subambientes) e disponibilizar artigos compostos de blocos de conteúdo multimídia.

---

## Estrutura de Conteúdo

* **Ambientes (disciplinas)**

  * Cada ambiente contém múltiplos subambientes.

* **Subambientes**

  * Pertencem a um ambiente.
  * Contêm múltiplos artigos.

* **Artigos**

  * Pertencem a um subambiente.
  * Compostos por uma sequência ordenada de blocos.

* **Blocos de artigo**

  * Podem ser de três tipos:

    * **Texto** → com estilos personalizáveis (tamanho, cor, fonte). O estilo é salvo em JSON.
    * **Imagem** → com URL e legenda opcional.
    * **Vídeo** → com URL e descrição opcional.

---

## Perfis de Usuário

* **Administrador**

  * Pode criar, atualizar e excluir ambientes, subambientes, artigos e blocos.
  * Pode gerenciar usuários (criar, bloquear/desbloquear, alterar roles).

* **Usuário normal**

  * Pode favoritar artigos.
  * Pode marcar blocos como lidos.

* **Visitante (sem login)**

  * Pode navegar e visualizar todos os conteúdos.

---

## Regras de Acesso

* A autenticação é feita via **JWT**.
* Todos os conteúdos (artigos, blocos, ambientes e subambientes) são visíveis a qualquer visitante.
* Apenas usuários autenticados podem interagir (favoritar, marcar lido).
* Apenas administradores podem gerenciar conteúdos e usuários.

---

## Tecnologias

* **Backend**: Fastify, Zod, Prisma, JWT, bcrypt
* **Banco**: MySQL (ORM Prisma)
* **Frontend**: Next.js (ou framework web equivalente)
* **Estrutura de Arquitetura** já definida (camadas: routes, controllers, services, repositories, models).

---

## Funcionalidades Principais

1. **Autenticação** (registro, login, renovação de token).
2. **Gerenciamento de usuários** (admin): CRUD, roles, bloqueio/desbloqueio.
3. **Gerenciamento de ambientes e subambientes** (admin).
4. **Gerenciamento de artigos e blocos** (admin).
5. **Favoritos e leituras** (usuário normal).
6. **Consulta pública** (visitantes).

---

## Telas e Fluxos (Frontend)

* Tela de **login/registro**.
* Tela de **listagem de ambientes**.
* Tela de **subambientes de um ambiente**.
* Tela de **artigos de um subambiente**.
* Tela de **exibição de artigo com blocos**.
* Tela de **favoritos e lidos do usuário**.
* Painel de **administração** (CRUD completo).

**Fluxos principais**:

* Autenticação → login/registro com JWT.
* Navegação pública → visitante acessa conteúdos sem login.
* Interação de usuário → favoritar e marcar como lido.
* Administração → criação/edição de ambientes, subambientes, artigos, blocos e usuários.

## Arquivos técnicos

prisma: [text](schema.prisma)
estrutura: [text](estrutura.md)
prompt_back: [text](prompt_back.md)
prompt_geral: [text](prompt_geral.md)
prompt_front: [text](prompt_front.md)
