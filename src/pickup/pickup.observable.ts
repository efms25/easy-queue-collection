import { Observable } from "../shared/observer/observable.abstract";
import { Observer } from "../shared/observer/observer.interface";
import { PickupRegister } from "./pickup.type";

export class PickupObservable extends Observable<
  Observer<PickupRegister>,
  PickupRegister
> {}
