# In.Orbit — Back-End

API REST para gerenciamento de metas semanais pessoais: permite criar metas, registrar conclusões e consultar o progresso da semana. Construída com Fastify e Drizzle ORM sobre PostgreSQL.

Projeto desenvolvido durante o NLW da [RocketSeat](https://www.rocketseat.com.br), com a base do curso estendida com organização de código em camadas (`functions` para regras de negócio, `http` para rotas) e validação de payloads com Zod integrada ao Fastify via `fastify-type-provider-zod`.

## Arquitetura

```
src/
├── db/            # Configuração do Drizzle (client, schema, seed)
├── functions/     # Regras de negócio (criação/remoção de metas e conclusões, cálculo de resumo semanal)
├── http/          # Rotas Fastify (uma por endpoint)
├── env.ts         # Validação das variáveis de ambiente com Zod
└── http/server.ts # Bootstrap do servidor Fastify
```

## Pré-requisitos

- Node.js 20.6+ (os scripts usam a flag nativa `--env-file`)
- PostgreSQL acessível via `DATABASE_URL`

## Variáveis de ambiente

Declaradas e validadas em `src/env.ts`:

- `PORT`
- `DATABASE_URL` (string de conexão do PostgreSQL)

Crie um arquivo `.env` na raiz com essas variáveis antes de rodar o projeto (não há `.env.example` no repositório).

## Instalação e execução

```bash
npm install
```

Rodar as migrações (Drizzle Kit está nas devDependencies):
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

Popular o banco com dados iniciais:
```bash
npm run seed
```

Subir o servidor em modo desenvolvimento:
```bash
npm run dev
```

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/goals` | Cria uma nova meta (`title`, `desiredWeeklyFrequency`) |
| `DELETE` | `/goal` | Remove uma meta (`goalId`) |
| `GET` | `/pending-goals` | Lista as metas pendentes da semana |
| `GET` | `/summary` | Retorna o resumo semanal de progresso |
| `POST` | `/completions` | Registra a conclusão de uma meta (`goalId`) |
| `DELETE` | `/completion` | Remove um registro de conclusão (`completionId`) |

CORS está liberado para qualquer origem (`origin: '*'`) em `src/http/server.ts`.

## Testes

Não há testes automatizados configurados no projeto atualmente.

## Licença

MIT — ver o arquivo `LICENSE`.
