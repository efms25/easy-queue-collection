import type { Observer } from "../shared/observer/observer.interface";
import type { PickupRegister } from "./pickup.type";

export class CounterObserver implements Observer<PickupRegister> {
  private counterName: string = "pickup";
  state = { [this.counterName]: 0 };

  constructor(name?: string) {
    if (name) this.counterName = name ?? "pickup";
    
  }

  update(): void {
    this.state[this.counterName] = this.state[this.counterName] ?? 1;
  }
}
