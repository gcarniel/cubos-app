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
- [ ] Script de reset/refresh do banco para dev

#### 5) Upload/Armazenamento de Imagens

- [x] Configurar provedor (S3)
- [x] Backend: presigned URL ou upload via backend
- [x] Restrições: tamanho máximo, mime-types permitidos
- [x] Salvar URL no registro do filme
- [ ] Fallback quando não houver imagem

#### 6) E-mail de Lembrete (Lançamento Futuro)

- [ ] Escolher serviço (Resend)
- [ ] Estratégia de agendamento:
  - [ ] Job por filme (BullMQ/Agenda)
  - [ ] ou Cron diário para checar lançamentos do dia
- [ ] Template do e-mail (assunto e corpo)
- [ ] Logs de envio e tratamento de erros
- [ ] Ambiente dev: visualizar e-mails (MailHog/Ethereal)

#### 7) Backend — API de Filmes

- [ ] Endpoints:
  - [x] POST /auth/signup
  - [x] POST /auth/login
  - [ ] GET /movies (lista com paginação, busca, filtros)
  - [x] POST /movies (criar — autenticado)
  - [ ] GET /movies/:id (detalhe — restrito ao dono)
  - [ ] PATCH /movies/:id (editar — dono)
  - [ ] DELETE /movies/:id (excluir — dono)
- [ ] Paginação (10 por página — page/limit ou offset/limit)
- [ ] Busca por texto (título/descrição)
- [ ] Filtros:
  - [ ] Duração (min/max)
  - [ ] Data de lançamento (início e fim)
  - [ ] +1 filtro adicional (ex.: orçamento min/max, gênero)
- [x] Validação (DTOs/schemas) e mensagens de erro padronizadas
- [x] Serialização e exclusão de campos sensíveis

#### 8) Permissões (Propriedade do Recurso)

- [ ] Restringir visualizar/editar/excluir ao usuário criador
- [x] Middleware que verifica createdByUserId
- [ ] Documentar no README: lista mostra todos os filmes, mas detalhes/edição/exclusão só do dono

#### 9) Frontend — Infraestrutura

- [x] Setup Next.js
- [ ] Router (react-router-dom)
- [ ] State/data fetching (React Query/Zustand/Context)
- [x] Design system básico (tokens + Button/Input/Modal/Card)
- [ ] Utilitários de data e moeda (date-fns/dayjs; Intl.NumberFormat)
- [x] Feedbacks: toasts, loaders, estados vazios e erros

#### 10) Frontend — Páginas e Fluxos

- [x] Login
  - [x] E-mail e senha (validação e mensagens de erro)
  - [x] Redireciona para lista ao logar
  - [x] Se autenticado, redireciona para lista
- [ ] Cadastro
  - [ ] Nome, E-mail, Senha, Confirmação (validação forte)
  - [ ] Se autenticado, redireciona para lista
- [ ] Listagem de Filmes
  - [ ] Exibir todos os filmes cadastrados
  - [ ] Campo de busca com filtragem dinâmica (debounce)
  - [ ] Paginação (10 por página)
  - [ ] Card clicável navega ao detalhe
  - [ ] Botão “Filtro” abre modal
- [ ] Modal de Filtros
  - [ ] Duração (min/max)
  - [ ] Data de lançamento (início e fim)
  - [ ] +1 filtro adicional (ex.: orçamento min/max, gênero)
  - [ ] Ações: Aplicar / Limpar / Cancelar
- [ ] Adição/Edição de Filme
  - [ ] Título, título original, data, duração, descrição, orçamento, imagem
  - [ ] Ao salvar com data futura, acionar agendamento de e-mail no backend
- [ ] Detalhes do Filme
  - [ ] Exibir título, título original, data, descrição, orçamento, imagem
  - [ ] Ações Editar/Excluir visíveis somente ao dono
- [ ] Proteção de rotas
  - [ ] Bloquear páginas restritas a usuários não logados

#### 11) Qualidade de Código e UX

- [ ] Componentes reutilizáveis e bem tipados (TS estrito)
- [ ] Acessibilidade: labels, aria-attrs, navegação por teclado
- [ ] Skeletons, estados vazios e loading coerentes
- [ ] Tratamento de erros de rede (mensagens amigáveis)
- [ ] Microinterações (focus/hover/active)

#### 12) Observabilidade e Logs

- [ ] Logger no backend (níveis info/warn/error)
- [ ] Tratamento global de erros (middleware)
- [ ] Logs de auditoria (criar/editar/excluir)
- [ ] Métricas básicas no frontend (opcional)

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

#### 14) Deploy (Opcional, recomendado)

- [ ] Backend em serviço gerenciado (Railway/Render/Fly/EC2)
- [ ] PostgreSQL gerenciado
- [ ] Frontend em Vercel/Netlify
- [ ] Variáveis de ambiente configuradas no ambiente
- [ ] Domínios e HTTPS
- [ ] README com URLs de produção

#### 15) Verificação Final

- [ ] Testar lembrete de e-mail (usar data próxima ou mock)
- [ ] Responsividade: 414/768/1024/1366/1440+
- [ ] Contraste e acessibilidade
- [ ] Rodar linters e testes
- [ ] Revisão final do README
- [ ] Criar release/tag no repositório

#### 16) Extras (Bônus)

- [ ] Filtro por múltiplos gêneros/tags
- [ ] Upload com recorte/otimização
- [ ] Infinite scroll alternativo à paginação
- [ ] i18n (pt/en)
- [ ] Dark mode automático via prefers-color-scheme
- [ ] Docker Compose para FE/BE/DB/MailHog em um comando
