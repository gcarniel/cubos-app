### Plano de Execução — Desafio Fullstack Cubos Tecnologia

Use esta checklist para organizar o trabalho e acompanhar o progresso. Marque cada item conforme concluir. Edite livremente para refletir suas escolhas de stack e melhorias.

#### 0) Preparação do Projeto

- [ ] Criar repositório (GitHub/GitLab/Bitbucket) com CI básico (lint/test/build)
- [x] Definir stack final:
  - [x] Frontend: Next
  - [x] Backend: Fastify
  - [x] ORM: Prisma.
  - [x] DB: PostgreSQL
  - [x] Uploads: S3
  - [x] E-mail: Resend
- [ ] Configurar variáveis de ambiente (.env e .env.example) para FE e BE

#### 1) Design e Temas

- [ ] Definir tokens de design (cores, tipografia, espaçamentos, sombras)
- [x] Implementar tema escuro como padrão
- [x] Alternância claro/escuro:
  - [x] Botão no canto superior direito
  - [ ] Persistência em localStorage
  - [ ] Variáveis CSS ou Theme Provider
- [x] Usar paleta Radix Colors
- [ ] Acessibilidade mínima (contraste AA, estados de foco visíveis)

#### 2) Responsividade

- [ ] Layouts para 1366px e 414px
- [ ] Breakpoints intermediários (ex.: 768, 1024, 1440)
- [ ] Testes em Chrome/Firefox/Safari
- [ ] Garantir fluidez em cards, modals e formulários

#### 3) Autenticação e Autorização

- [ ] Backend: rotas de auth (signup, login, refresh, logout)
- [x] Backend: hash de senha (bcrypt/argon2)
- [x] Backend: JWT (access + refresh) ou sessões (documentar decisão)
- [x] Middleware/Guards para rotas privadas
- [x] Frontend: formulários de Login e Cadastro (validação e erros)
- [x] Frontend: gestão de sessão (React Query/Context/Zustand)
- [x] Redirecionamentos:
  - [x] Se logado, bloquear Login/Cadastro (ir para lista)
  - [x] Se não logado, bloquear lista/detalhe/edição (ir para Login)

#### 4) Modelagem e Migrações (PostgreSQL)

- [ ] Modelos:
  - [x] User: id, name, email (único), password_hash, createdAt, updatedAt
  - [x] Movie: id, title, originalTitle, releaseDate, duration, description, budget, posterUrl, createdByUserId, createdAt, updatedAt
  - [x] Genre/Tag + tabela relacional
- [x] Criar migrações iniciais
- [x] Seeds opcionais (usuário teste + filmes)

#### 5) Upload/Armazenamento de Imagens

- [x] Configurar provedor (S3)
- [x] Backend: presigned URL ou upload via backend
- [x] Restrições: tamanho máximo, mime-types permitidos
- [x] Salvar URL no registro do filme
- [ ] Fallback quando não houver imagem

#### 6) E-mail de Lembrete (Lançamento Futuro)

- [x] Escolher serviço (Resend)
- [x] Estratégia de agendamento:
  - [x] Cron diário para checar lançamentos do dia
- [x] Template do e-mail (assunto e corpo)
- [x] Logs de envio e tratamento de erros

#### 7) Backend — API de Filmes

- [ ] Endpoints:
  - [x] POST /auth/signup
  - [x] POST /auth/login
  - [x] GET /movies (lista com paginação, busca, filtros)
  - [x] POST /movies (criar — autenticado)
  - [x] GET /movies/:id (detalhe — restrito ao dono)
  - [x] PUT /movies/:id (editar — dono)
  - [x] DELETE /movies/:id (excluir — dono)
- [x] Paginação (10 por página — page/limit ou offset/limit)
- [x] Busca por texto (título/descrição)
- [x] Filtros:
  - [x] Duração (min/max)
  - [x] Data de lançamento (início e fim)
  - [x] +1 filtro adicional (ex.: orçamento min/max, gênero)
- [x] Validação (DTOs/schemas) e mensagens de erro padronizadas
- [x] Serialização e exclusão de campos sensíveis

#### 8) Permissões (Propriedade do Recurso)

- [x] Restringir visualizar/editar/excluir ao usuário criador
- [x] Middleware que verifica createdByUserId
- [x] Documentar no README: lista mostra todos os filmes, mas detalhes/edição/exclusão só do dono

#### 9) Frontend — Infraestrutura

- [x] Setup Next.js
- [ ] Router (react-router-dom)
- [x] State/data fetching (React Query/Zustand/Context)
- [x] Design system básico (tokens + Button/Input/Modal/Card)
- [x] Utilitários de data e moeda (date-fns/dayjs; Intl.NumberFormat)
- [x] Feedbacks: toasts, loaders, estados vazios e erros

#### 10) Frontend — Páginas e Fluxos

- [x] Login
  - [x] E-mail e senha (validação e mensagens de erro)
  - [x] Redireciona para lista ao logar
  - [x] Se autenticado, redireciona para lista
- [x] Cadastro
  - [x] Nome, E-mail, Senha, Confirmação (validação forte)
  - [x] Se autenticado, redireciona para lista
- [x] Listagem de Filmes
  - [x] Exibir todos os filmes cadastrados
  - [x] Campo de busca com filtragem dinâmica (debounce)
  - [x] Paginação (10 por página)
  - [x] Card clicável navega ao detalhe
  - [x] Botão “Filtro” abre modal
- [x] Modal de Filtros
  - [x] Duração (min/max)
  - [x] Data de lançamento (início e fim)
  - [x] +1 filtro adicional (ex.: orçamento min/max, gênero)
  - [x] Ações: Aplicar / Limpar / Cancelar
- [x] Adição/Edição de Filme
  - [x] Título, título original, data, duração, descrição, orçamento, imagem
  - [x] Ao salvar com data futura, acionar agendamento de e-mail no backend
- [x] Detalhes do Filme
  - [x] Exibir título, título original, data, descrição, orçamento, imagem
  - [x] Ações Editar/Excluir permitidas somente ao dono
- [x] Proteção de rotas
  - [x] Bloquear páginas restritas a usuários não logados

#### 11) Qualidade de Código e UX

- [x] Componentes reutilizáveis e bem tipados (TS estrito)
- [x] Acessibilidade: labels, aria-attrs, navegação por teclado
- [x] Skeletons, estados vazios e loading coerentes
- [x] Tratamento de erros de rede (mensagens amigáveis)
- [x] Microinterações (focus/hover/active)

#### 13) Documentação (README.md)

- [ ] Descrição do projeto e arquitetura
- [ ] Setup local:
  - [ ] Requisitos (Node, Docker, etc.)
  - [ ] Variáveis de ambiente e exemplos
  - [ ] Scripts para iniciar FE/BE/DB
- [ ] Como rodar migrações e seeds
- [ ] Config de uploads (S3/R2/GCS) no dev
- [ ] Visualização de e-mails (MailHog/Ethereal)
- [ ] Decisões técnicas e justificativas (stacks, libs, padrões)
- [ ] Melhorias/alterações criativas no design (com rationale)
- [ ] Endpoints da API (rota, método, body, response)
- [ ] Limitações e próximos passos

#### 15) Verificação Final

- [ ] Testar lembrete de e-mail (usar data próxima ou mock)
- [ ] Responsividade: 414/768/1024/1366/1440+
- [ ] Contraste e acessibilidade
- [ ] Rodar linters e testes
- [ ] Revisão final do README
- [ ] Criar release/tag no repositório
