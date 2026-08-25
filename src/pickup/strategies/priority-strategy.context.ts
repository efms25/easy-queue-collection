import { PickupRegister } from "../pickup.type";
import { PriorityStrategy } from "./priority-strategy.interface";

export class PriorityStrategyContext {
  strategy?: PriorityStrategy;

  setStrategy(strategy: PriorityStrategy) {
    this.strategy = strategy;
  }

  calculatePriority(pickup: PickupRegister) {
    if (!this.strategy)
        throw new Error('Strategy not setted')
    this.strategy.calculatePriority(pickup);
  }
}
