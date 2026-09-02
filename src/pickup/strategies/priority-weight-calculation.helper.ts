import { WEIGHT_PER_HOUR_MULTIPLIER } from "./prioritization-weights.ts";

export function calculateTimePriorityWeights(createdAt: Date, comparatorDate: Date = new Date()): number {
  const now = comparatorDate;
  const createdAtDate = new Date(createdAt);
  const timeDiff = now.getTime() - createdAtDate.getTime();

  return Math.floor((timeDiff / (1000 * 60 * 60)) * WEIGHT_PER_HOUR_MULTIPLIER);
}
