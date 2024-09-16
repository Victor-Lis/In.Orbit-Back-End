import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'

import { env } from '../env'

import { createGoalRoute } from '../http/create-goal'
import { createCompletionRoute } from '../http/create-completion'
import { getPendingGoalsRoute } from './get-pending-goals'
import { getWeekSummaryRoute } from './get-week-summary'
import { deleteCompletionRoute } from './delete-goal-completion'
import { deleteGoalRoute } from './delete-goal'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getWeekSummaryRoute)
app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(deleteCompletionRoute)
app.register(deleteGoalRoute)

app
  .listen({
    port: Number(env.PORT),
  })
  .then(() => {
    console.log(`HTTP server running! PORT:${env.PORT}`)
  })
