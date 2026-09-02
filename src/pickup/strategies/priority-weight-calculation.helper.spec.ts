import { WEIGHT_PER_HOUR_MULTIPLIER } from "./prioritization-weights.ts";
import { calculateTimePriorityWeights } from "./priority-weight-calculation.helper.ts";

describe("priorityWeightCalculationHelper", () => {
   it("should return the time calculation", () => {
    const createdAt = new Date("2026-09-01T10:00:00Z");
    const now = new Date("2026-09-01T15:00:00Z");

    const calcResult = Math.floor(((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)) * WEIGHT_PER_HOUR_MULTIPLIER)

    const result = calculateTimePriorityWeights(createdAt, now);

    expect(result).toBe(calcResult);

   })
})