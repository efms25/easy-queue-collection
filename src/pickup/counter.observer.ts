import { Observer } from "../shared/observer/observer.interface";
import { PickupRegister } from "./pickup.type";

export class CounterObserver implements Observer<PickupRegister> {
  private counterName: string = "pickup";
  state = { [this.counterName]: 0 };

  constructor(name?: string) {
    if (name) this.counterName = name;
  }

  update(): void {
    this.state[this.counterName]++;
  }
}
