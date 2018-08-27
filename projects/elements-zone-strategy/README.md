# elements-zone-strategy

This library provides an Angular Elements Strategy Factory which always runs in the NgZone, allowing automatic change detection

## Usage

install the package: 

    npm install --save elements-zone-strategy

use the new strategy:

    import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

    const strategyFactory = new ElementZoneStrategyFactory(HelloComponent, this.injector);
    const helloElement = createCustomElement(HelloComponent, { injector: this.injector, strategyFactory });
    customElements.define('my-hello', helloElement);
