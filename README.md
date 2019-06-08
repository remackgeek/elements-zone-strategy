# elements-zone-strategy

This library provides an Angular Elements Strategy Factory which always runs in the NgZone, allowing automatic change detection

![license](https://img.shields.io/npm/l/elements-zone-strategy.svg)   ![downloads](https://img.shields.io/npm/dt/elements-zone-strategy.svg) 

This addresses the following issues with @angular/elements:
* [#23841 - elements: change detection breaks in *ngFor loop](https://github.com/angular/angular/issues/23841)
* [#24181 - @angular/elements component events are called from an inconsistent zone](https://github.com/angular/angular/issues/24181) -- This is fixed in zone.js v0.8.27


## Usage

install the package: 

    npm install --save elements-zone-strategy

use the new strategy:

    import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

    const strategyFactory = new ElementZoneStrategyFactory(HelloComponent, this.injector);
    const helloElement = createCustomElement(HelloComponent, { injector: this.injector, strategyFactory });
    customElements.define('my-hello', helloElement);
