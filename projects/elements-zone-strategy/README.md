# elements-zone-strategy

This library provides an Angular Elements Strategy Factory which always runs in the NgZone, allowing automatic change detection

![license](https://img.shields.io/npm/l/elements-zone-strategy.svg) ![downloads](https://img.shields.io/npm/dt/elements-zone-strategy.svg)

<span style="font-size:24px;font-weight:bold">This library is no longer needed for Angular versions 10.1 and above!</span>

see: [here](https://github.com/angular/angular/pull/37814)

This addresses the following issues with @angular/elements:

- [#23841 - elements: change detection breaks in \*ngFor loop](https://github.com/angular/angular/issues/23841) -- this is fixed in angular 10.1.0
- [#24181 - @angular/elements component events are called from an inconsistent zone](https://github.com/angular/angular/issues/24181) -- This is fixed in zone.js v0.8.27

## Usage

install the package:

    npm install --save elements-zone-strategy

use the new strategy:

    import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

    const strategyFactory = new ElementZoneStrategyFactory(HelloComponent, this.injector);
    const helloElement = createCustomElement(HelloComponent, { injector: this.injector, strategyFactory });
    customElements.define('my-hello', helloElement);

## Versions

Not needed in Angular 11

use version 10.0.0 for Angular 10 (not needed as of 10.1)

use version 9.0.0 for Angular 9

use version 8.0.0 for Angular 6-8
