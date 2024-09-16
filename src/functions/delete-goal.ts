import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'

interface deleteGoalRequest {
  goalId: string
}

export async function deleteGoal({ goalId }: deleteGoalRequest) {
  const deleteResult = await db
    .delete(goals)
    .where(eq(goals.id, goalId))
    .returning()

  const goalCompletion = deleteResult[0]

  return {
    goalCompletion,
  }
}
