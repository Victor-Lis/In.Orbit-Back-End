import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteGoalCompletion } from '../functions/delete-goal-completion'

export const deleteCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/completion',
    {
      schema: {
        body: z.object({
          completionId: z.string().min(1),
        }),
      },
    },
    async req => {
      const { completionId } = req.body
      await deleteGoalCompletion({ completionId })
    }
  )
}
