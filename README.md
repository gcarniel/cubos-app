<div align="center">
  <h1>🎬 Cubos App - Plataforma de Gerenciamento de Filmes</h1>
  <p>Uma aplicação fullstack moderna para catalogar, gerenciar e descobrir filmes</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
  ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Decisões Técnicas](#-decisões-técnicas)
- [Melhorias Futuras](#-melhorias-futuras)

---

## 🎯 Sobre o Projeto

O **Cubos App** é uma plataforma completa de gerenciamento de filmes desenvolvida como parte do desafio fullstack da Cubos Tecnologia. A aplicação permite que usuários cadastrem, visualizem, editem e excluam filmes, além de oferecer recursos avançados de busca e filtragem.

Tomei como decisão nos seguintes pontos:

- **Visualização** Todo usuário pode ver os filmes cadastrados de outros usuários.
- **Exclusão** Apenas quem cadastrou o filme pode excluí-lo.
- **Edição** Apenas quem cadastrou o filme pode editá-lo.

Criei também paginas de recuperação e resete de senha, são implementadas de forma simples.

### Destaques

- 🔐 **Autenticação completa** com NextAuth.js e JWT
- 🎨 **Tema claro/escuro** com persistência
- 📱 **Design responsivo** para mobile, tablet e desktop
- 🔍 **Busca e filtros avançados** (duração, data de lançamento, avaliação)
- 📊 **Paginação eficiente** com React Query
- 🖼️ **Upload de imagens** para posters e capas
- 🎬 **Integração com trailers** via React Player
- ♿ **Acessibilidade** com componentes Radix UI
- 🚀 **Performance otimizada** com Next.js 15 e Turbopack

---

## ✨ Funcionalidades

### Autenticação e Autorização

- ✅ Cadastro de novos usuários com validação robusta
- ✅ Login com email e senha
- ✅ Proteção de rotas privadas via middleware
- ✅ Sessões JWT com duração de 7 dias
- ✅ Redirecionamento automático baseado no estado de autenticação
- ✅ Recuperação de senha (esqueci minha senha)

### Gerenciamento de Filmes

- ✅ **Listagem de filmes** com cards informativos
- ✅ **Cadastro de filmes** com campos completos:
  - Título e título original
  - Data de lançamento
  - Duração, orçamento, receita e lucro
  - Sinopse detalhada
  - Gêneros (múltipla seleção)
  - Idioma original
  - Popularidade e avaliações
  - URL do poster e capa
  - URL do trailer
- ✅ **Edição de filmes** (apenas pelo usuário criador)
- ✅ **Exclusão de filmes** (apenas pelo usuário criador)
- ✅ **Visualização detalhada** com todas as informações

### Busca e Filtros

- ✅ **Busca por texto** no título dos filmes
- ✅ **Filtro por duração** (mínima e máxima)
- ✅ **Filtro por data de lançamento** (período)
- ✅ **Filtro por avaliação** (rating mínimo e máximo)
- ✅ **Filtro por gênero** (múltipla seleção)
- ✅ **Paginação** com 10 filmes por página
- ✅ **Debounce na busca** para melhor performance

### Interface e UX

- ✅ **Tema claro/escuro** com alternância suave
- ✅ **Design responsivo** (414px, 768px, 1024px, 1366px+)
- ✅ **Componentes reutilizáveis** com Radix UI
- ✅ **Feedback visual** com toasts (Sonner)
- ✅ **Estados de loading** com skeletons
- ✅ **Tratamento de erros** com mensagens amigáveis
- ✅ **Validação de formulários** com Zod e React Hook Form
- ✅ **Máscaras de input** para campos específicos

### Recursos Adicionais

- ✅ **Upload de arquivos** com validação de tamanho e tipo
- ✅ **Player de vídeo** integrado para trailers
- ✅ **Indicador de progresso circular** para avaliações
- ✅ **Tags de gênero** com cores personalizadas
- ✅ **Formatação de moeda** para valores financeiros
- ✅ **Formatação de datas** com date-fns

---

## 🛠️ Tecnologias Utilizadas

### Frontend Core

| Tecnologia      | Versão | Descrição                                |
| --------------- | ------ | ---------------------------------------- |
| **Next.js**     | 15.5.4 | Framework React com SSR e App Router     |
| **React**       | 19.1.0 | Biblioteca para construção de interfaces |
| **TypeScript**  | 5.x    | Superset JavaScript com tipagem estática |
| **TailwindCSS** | 4.0    | Framework CSS utility-first              |

### Gerenciamento de Estado e Dados

| Tecnologia         | Versão | Descrição                                  |
| ------------------ | ------ | ------------------------------------------ |
| **TanStack Query** | 5.90.2 | Gerenciamento de estado assíncrono e cache |
| **Zustand**        | 5.0.8  | Gerenciamento de estado global leve        |
| **Axios**          | 1.12.2 | Cliente HTTP para requisições              |

### Autenticação

| Tecnologia      | Versão        | Descrição                          |
| --------------- | ------------- | ---------------------------------- |
| **NextAuth.js** | 5.0.0-beta.29 | Autenticação completa para Next.js |

### UI e Componentes

| Tecnologia       | Versão  | Descrição                                |
| ---------------- | ------- | ---------------------------------------- |
| **Radix UI**     | 1.x     | Componentes acessíveis e não estilizados |
| **Lucide React** | 0.544.0 | Biblioteca de ícones                     |
| **Sonner**       | 2.0.7   | Sistema de notificações toast            |
| **next-themes**  | 0.4.6   | Gerenciamento de temas                   |
| **React Player** | 3.3.3   | Player de vídeo para trailers            |

### Formulários e Validação

| Tecnologia              | Versão | Descrição                                 |
| ----------------------- | ------ | ----------------------------------------- |
| **React Hook Form**     | 7.63.0 | Gerenciamento de formulários performático |
| **Zod**                 | 4.1.11 | Validação de schemas TypeScript-first     |
| **@hookform/resolvers** | 5.2.2  | Integração Zod + React Hook Form          |

### Utilitários

| Tecnologia                   | Versão | Descrição                             |
| ---------------------------- | ------ | ------------------------------------- |
| **date-fns**                 | 4.1.0  | Manipulação e formatação de datas     |
| **clsx**                     | 2.1.1  | Utilitário para classes condicionais  |
| **tailwind-merge**           | 3.3.1  | Merge inteligente de classes Tailwind |
| **class-variance-authority** | 0.7.1  | Variantes de componentes              |
| **use-mask-input**           | 3.5.2  | Máscaras para inputs                  |
| **cmdk**                     | 1.1.1  | Command menu (busca de comandos)      |

### Desenvolvimento

| Tecnologia                    | Versão | Descrição                         |
| ----------------------------- | ------ | --------------------------------- |
| **ESLint**                    | 9.36.0 | Linter para JavaScript/TypeScript |
| **@rocketseat/eslint-config** | 2.2.2  | Configuração ESLint da Rocketseat |
| **Turbopack**                 | -      | Bundler ultra-rápido do Next.js   |

---

## 🏗️ Arquitetura

### Estrutura de Pastas

```
src/
├── app/                      # App Router do Next.js
│   ├── (private)/           # Rotas protegidas
│   │   ├── movie/[id]/     # Detalhes do filme
│   │   └── page.tsx        # Dashboard principal
│   ├── (public)/           # Rotas públicas
│   │   ├── login/          # Página de login
│   │   ├── register/       # Página de cadastro
│   │   ├── forgot/         # Esqueci minha senha
│   │   └── recover-password/ # Recuperação de senha
│   ├── api/                # API Routes
│   │   └── auth/           # Endpoints NextAuth
│   ├── layout.tsx          # Layout raiz
│   └── globals.css         # Estilos globais
│
├── features/               # Features organizadas por domínio
│   ├── movie/             # Domínio de filmes
│   │   ├── components/    # Componentes específicos
│   │   ├── hooks/         # Hooks customizados
│   │   ├── store/         # Estado Zustand
│   │   └── types/         # Tipos TypeScript
│   ├── login/             # Domínio de login
│   ├── register/          # Domínio de registro
│   ├── forgot/            # Domínio de recuperação
│   └── recover-password/  # Domínio de reset de senha
│
├── components/            # Componentes compartilhados
│   ├── ui/               # Componentes base (Radix UI)
│   ├── header.tsx        # Cabeçalho
│   ├── footer.tsx        # Rodapé
│   ├── pagination.tsx    # Paginação
│   └── theme-toggle.tsx  # Alternador de tema
│
├── lib/                  # Utilitários e configurações
│   ├── api.ts           # Cliente Axios configurado
│   ├── auth.ts          # Configuração NextAuth
│   ├── utils.ts         # Funções utilitárias
│   └── constants.ts     # Constantes da aplicação
│
├── hooks/               # Hooks globais
├── icons/               # Ícones customizados
├── providers/           # Providers React
│   ├── query-provider.tsx  # TanStack Query
│   └── theme-provider.tsx  # Next Themes
│
├── middleware.ts        # Middleware de autenticação
└── routes.ts           # Mapa de rotas
```

### Padrões de Arquitetura

#### 1. **Feature-Based Organization**

Cada funcionalidade principal (movies, auth) tem sua própria pasta com componentes, hooks, tipos e estado isolados.

#### 2. **Server Components + Client Components**

- Uso estratégico de Server Components para melhor performance
- Client Components apenas onde necessário (interatividade)

#### 3. **Middleware de Autenticação**

- Proteção de rotas no nível do middleware
- Verificação de token JWT
- Redirecionamentos automáticos

#### 4. **State Management Híbrido**

- **TanStack Query**: Cache e sincronização de dados do servidor
- **Zustand**: Estado global da UI (modais, filtros)
- **React Hook Form**: Estado de formulários

#### 5. **Type Safety**

- TypeScript estrito em todo o projeto
- Validação runtime com Zod
- Tipos compartilhados entre frontend e backend

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 22.x ou superior
- **npm** ou **yarn** ou **pnpm**
- **Git**

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/cubos-app.git
cd cubos-app
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3333

# NextAuth
AUTH_SECRET=sua-chave-secreta-aqui

```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

---

## 🔐 Variáveis de Ambiente

### Obrigatórias

| Variável              | Descrição              | Exemplo                   |
| --------------------- | ---------------------- | ------------------------- |
| `NEXT_PUBLIC_API_URL` | URL da API backend     | `http://localhost:3333`   |
| `AUTH_SECRET`         | Chave secreta para JWT | `sua-chave-super-secreta` |

### Opcionais

| Variável   | Descrição            | Padrão        |
| ---------- | -------------------- | ------------- |
| `NODE_ENV` | Ambiente de execução | `development` |

### Gerando AUTH_SECRET

```bash
openssl rand -base64 32
```

---

## 💻 Como Usar

### 1. Criar uma Conta

1. Acesse a página de registro em `/register`
2. Preencha os campos:
   - Nome completo
   - Email válido
   - Senha (mínimo 6 caracteres)
   - Confirmação de senha
3. Clique em "Cadastrar"
4. Você será redirecionado automaticamente para o dashboard

### 2. Fazer Login

1. Acesse a página de login em `/login`
2. Insira seu email e senha
3. Clique em "Entrar"
4. Você será redirecionado para o dashboard

### 3. Adicionar um Filme

1. No dashboard, clique em "Adicionar Filme"
2. Preencha os campos obrigatórios:
   - Título
   - Título original
   - Data de lançamento
   - Duração (em minutos)
   - Sinopse
   - Gêneros
   - URL do poster
3. Campos opcionais:
   - Orçamento, receita e lucro
   - URL da capa
   - URL do trailer
   - Popularidade e avaliações
4. Clique em "Salvar"

### 4. Buscar e Filtrar Filmes

#### Busca por Texto

- Digite no campo de busca no topo do dashboard
- A busca é feita automaticamente com debounce

#### Filtros Avançados

1. Clique no botão "Filtros"
2. Configure os filtros desejados:
   - **Duração**: Mínima e máxima (em minutos)
   - **Data de Lançamento**: Período inicial e final
   - **Avaliação**: Rating mínimo e máximo
   - **Gêneros**: Selecione um ou mais gêneros
3. Clique em "Aplicar" para filtrar
4. Use "Limpar" para resetar os filtros

### 5. Visualizar Detalhes

1. Clique em qualquer card de filme
2. Você será redirecionado para a página de detalhes
3. Visualize todas as informações do filme
4. Assista ao trailer (se disponível)

### 6. Editar um Filme

1. Na página de detalhes, clique em "Editar"
2. Modifique os campos desejados
3. Clique em "Salvar"

**Nota**: Você só pode editar filmes que você mesmo cadastrou.

### 7. Excluir um Filme

1. Na página de detalhes, clique em "Deletar"

**Nota**: Você só pode excluir filmes que você mesmo cadastrou.

### 8. Alternar Tema

- Clique no ícone de sol/lua no canto superior direito
- O tema será alternado entre claro e escuro
- A preferência é salva automaticamente

---

## 📁 Estrutura do Projeto

### Componentes Principais

#### MoviesDashboard

Componente principal do dashboard com busca e botões de ação.

#### MovieCard

Lista de cards de filmes com paginação.

#### MovieDetails

Visualização detalhada de um filme com todas as informações.

#### MovieRegister

Modal de cadastro/edição de filmes com formulário completo.

#### MovieFilters

Modal de filtros avançados com múltiplas opções.

### Hooks Customizados

#### useMovies

Gerencia a listagem de filmes com filtros e paginação.

#### useMovieDetail

Busca detalhes de um filme específico.

#### useMovieRegister

Gerencia o cadastro e edição de filmes.

#### useMovieFilters

Controla o estado dos filtros e busca.

### Stores (Zustand)

#### movieStore

Estado global para modais e filme selecionado.

#### movieFiltersStore

Estado global para filtros e paginação.

---

## 🎨 Decisões Técnicas

### Por que Next.js 15?

- **App Router**: Roteamento moderno com Server Components
- **Turbopack**: Build e HMR ultra-rápidos
- **Otimizações automáticas**: Image, Font, Script
- **SEO-friendly**: SSR e metadata dinâmica

### Por que TanStack Query?

- **Cache inteligente**: Reduz requisições desnecessárias
- **Sincronização automática**: Refetch em foco/reconexão
- **Otimistic updates**: UX mais fluida
- **DevTools**: Debugging facilitado

### Por que Zustand?

- **Simplicidade**: API minimalista e intuitiva
- **Performance**: Sem re-renders desnecessários
- **TypeScript**: Suporte nativo e type-safe
- **Sem boilerplate**: Menos código que Redux

### Por que Radix UI?

- **Acessibilidade**: WAI-ARIA compliant
- **Não estilizado**: Controle total do design
- **Composição**: Componentes altamente customizáveis
- **Qualidade**: Mantido pela Vercel

### Por que Zod + React Hook Form?

- **Type safety**: Validação runtime + TypeScript
- **Performance**: Validação otimizada
- **DX**: Mensagens de erro claras
- **Integração**: Resolver nativo

## 📄 Licença

Este projeto foi desenvolvido como parte do desafio fullstack da Cubos Tecnologia.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ para o desafio Cubos Tecnologia

---

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [Radix UI](https://www.radix-ui.com/)
- [TanStack Query](https://tanstack.com/query)
- [Vercel](https://vercel.com/)
- [Cubos Tecnologia](https://cubos.io/)

---

<div align="center">
  <p>Feito com Next.js e ☕</p>
</div>
