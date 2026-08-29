import { Observable } from "../shared/observer/observable.abstract.ts";
import { Observer } from "../shared/observer/observer.interface.ts";
import { PickupRegister } from "./pickup.type.ts";

export class PickupObservable extends Observable<
  Observer<PickupRegister>,
  PickupRegister
> {}
