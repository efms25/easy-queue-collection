import { log } from "../shared/Log/log.helper";
import type { Observer } from "../shared/observer/observer.interface";
import type { PickupRegister } from "./pickup.type";

export class LoggerObserver implements Observer<PickupRegister> {
    private context = ''
    constructor(context: string) {
        this.context = context;
    }

    update(data: PickupRegister): void {
        const jsonData = JSON.stringify(data);
        log(` - ${this.context} - ${jsonData}`);
    }
}