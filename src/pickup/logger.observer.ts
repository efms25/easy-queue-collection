import { log } from "../shared/Log/log.helper.ts";
import { Observer } from "../shared/observer/observer.interface.ts";
import { PickupRegister } from "./pickup.type.ts";

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