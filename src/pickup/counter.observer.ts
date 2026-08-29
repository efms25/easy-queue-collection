import { Observer } from "../shared/observer/observer.interface.ts";
import { PickupRegister } from "./pickup.type.ts";

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
