import { NgZone, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { NgElementStrategyEvent, NgElementStrategy } from '@angular/elements';


export class ElementZoneStrategy {
    private ngZone: NgZone;

    events: Observable<NgElementStrategyEvent>;

    constructor(protected strategy: NgElementStrategy, protected injector: Injector) {
        this.ngZone = this.injector.get<NgZone>(NgZone);
    }

    connect(element: HTMLElement): void {
        this.runInZone(() => { this.strategy.connect(element); });

        this.events = this.strategy.events;
    }

    disconnect(): void {
        this.runInZone(() => { this.strategy.disconnect(); });
    }
    getInputValue(propName: string) {
        // tslint:disable-next-line:arrow-return-shorthand
        return this.runInZone(() => { return this.strategy.getInputValue(propName); });
    }
    setInputValue(propName: string, value: string): void {
        this.runInZone(() => { this.strategy.setInputValue(propName, value); });
    }

    private runInZone(fn: () => any) { return NgZone.isInAngularZone() ? fn() : this.ngZone.run(fn); }
}
