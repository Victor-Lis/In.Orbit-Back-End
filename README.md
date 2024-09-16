# In.Orbit Back-End

Esse é o lado do servidor do projeto in.orbit, ele é uma API construída junto ao [Drizzle ORM](https://orm.drizzle.team/) para ser requisitada pelo [Front-End](https://github.com/Victor-Lis/In.Orbit-Web) e assim levar os dados até o lado do cliente...

## Drizzle ORM
Foi a primeira vez que trabalhei com esse [ORM](https://www.devmedia.com.br/orm-object-relational-mapper/19056), já tinha tido experiências anteriores com o [Prisma Schema](https://www.prisma.io/docs/orm/prisma-schema) então já tinha certa familiariadade com o uso de ORMs, mas ainda si foi uma experiência muito agregadora...

### Como usar?

#### Instalação
```cmd
npm i drizzle-orm & npm i drizzle-kit & npm i postgres
```
Obs: Baixei o 'postgres' pois foi o banco que usei

#### Iniciando Schema
```path
src/bd/index.ts
```
```ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { env } from '../env'

export const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, { schema })
```
Com esse trecho acima declarado já é possível manipular o banco de dados

#### Declarando tabelas
```path
src/bd/schema.ts
```
```ts
import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const goals = pgTable('goals', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const goalCompletions = pgTable('goal_completions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  goalId: text('goal_id')
    .references(() => goals.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
```

#### Executando drizzle-kit
Criando "molde" para upar para o banco
```cmd
npx drizzle-kit generate
```

Upando molde das tabelas para o banco
```cmd
npx drizzle-kit migrate
```

#### Finalizando
Com isso já temos nosso banco de dados criado e estabelicida a conexão com o ORM.

## Construindo a API
Nesse caso utilizei o [Fastify](https://fastify.dev/) para construção de rotas(primeira vez que fiz isso, anteriormente utilizava o [Express](https://expressjs.com/pt-br/))

### Instalação
```cmd
npm i fastify & npm i fastify-type-provider-zod & npm i @fastify/cors
```

### Começando
```path
src/http/server.ts
```
```ts
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app
  .listen({
    port: Number(env.PORT),
  })
  .then(() => {
    console.log(`HTTP server running! PORT:${env.PORT}`)
  })
```

### Declarando rotas
Deixarei abaixo um exemplo de como criei uma rota e posteriormente adicionei ao fastify.

#### Função criada para possibilitar a criação das rotas
```path
src/functions/create-goals.ts
```
```ts
import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
```

#### Aplicação da função na rota
```path
src/http/create-goal.ts
```
```ts
import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../functions/create-goals'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async req => {
      const { title, desiredWeeklyFrequency } = req.body
      await createGoal({
        title: title,
        desiredWeeklyFrequency: desiredWeeklyFrequency,
      })
    }
  )
}
```

#### Agora basta voltar lá na tela inicial e "registrar" a rota
```path
src/http/server.ts
```
```ts
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'
import { createGoalRoute } from '../http/create-goal'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// Trecho em que é registrado 
app.register(createGoalRoute)

app
  .listen({
    port: Number(env.PORT),
  })
  .then(() => {
    console.log(`HTTP server running! PORT:${env.PORT}`)
  })
```

#### Finalizando 
Com isso já é possível entender o molde da aplicação, claro existem outras rotas (aproximadamente 5) e funções, mas a base dessa aplicação é essa

## Consultando servidor
Para realizar as consultas utilizo há bastante tempo o [Insomnia](https://insomnia.rest/).

Conheço também o [Postman](https://web.postman.co/), funciona perfeitamente bem, porém não é minha preferência kkk

### Exemplo de uso
![image](https://github.com/user-attachments/assets/67eebc11-d8ba-4743-b65b-570cc5148e25)

# Autores
- [@Victor-Lis](https://www.linkedin.com/in/victor-lis-bronzo/)
