import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteGoal } from '../functions/delete-goal'

export const deleteGoalRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/goal',
    {
      schema: {
        body: z.object({
          goalId: z.string().min(1),
        }),
      },
    },
    async req => {
      const { goalId } = req.body
      console.log(goalId)
      await deleteGoal({ goalId })
    }
  )
}
