import type { Observer } from "./observer.interface";

export abstract class Observable<TObserver extends Observer<TData>, TData> {

    private subscribers: Array<TObserver> = [];
    
    subscribe(observer:TObserver): void {
        this.subscribers.push(observer);
    }
    notify(data: TData) {
        this.subscribers.forEach(s => s.update(data))
    }
}