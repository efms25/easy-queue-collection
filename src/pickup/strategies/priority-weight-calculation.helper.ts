import { WEIGHT_PER_HOUR_MULTIPLIER } from "./prioritization-weights";

export function calculateTimePriorityWeights(createdAt: Date): number {
  const now = new Date();
  const createdAtDate = new Date(createdAt);
  const timeDiff = now.getTime() - createdAtDate.getTime();

  return Math.floor((timeDiff / (1000 * 60 * 60)) * WEIGHT_PER_HOUR_MULTIPLIER);
}
