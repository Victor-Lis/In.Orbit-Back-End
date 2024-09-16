import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'

interface deleteGoalCompletionRequest {
  completionId: string
}

export async function deleteGoalCompletion({
  completionId,
}: deleteGoalCompletionRequest) {
  const deleteResult = await db
    .delete(goalCompletions)
    .where(eq(goalCompletions.id, completionId))
    .returning()
  const goalCompletion = deleteResult[0]

  return {
    goalCompletion,
  }
}
