import { Injector, Type } from '@angular/core';
import { createCustomElement, NgElementStrategy, NgElementStrategyFactory } from '@angular/elements';
import { ElementZoneStrategy } from './element-zone-strategy';

export class ElementZoneStrategyFactory implements NgElementStrategyFactory {
  static counter = 1;
  private ngElement;

  protected string4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  protected generateName() {
    let result = 'dummy-name-n';

    const temp = ElementZoneStrategyFactory.counter + '';

    result = result + temp + '-' + this.string4() + this.string4() + this.string4() + '-' +
      this.string4() + this.string4() + '-' + this.string4();

    ElementZoneStrategyFactory.counter++;
    return result;
  }

  constructor(private component: Type<any>, private injector: Injector) {
    this.ngElement = createCustomElement(this.component, { injector: this.injector });
    // this is to keep the document-register-element polyfill happy
    // it doesn't like creating elements before the define, so we fill the registry with a random definition
    customElements.define(this.generateName(), this.ngElement);
  }

  create(injector: Injector): NgElementStrategy {
    // the only way to get a default strategy outside @angular/elements
    // is to create the ngElement/ngElementImpl and get it from a property
    let tempElement = new this.ngElement(this.injector);
    const strategy = tempElement['ngElementStrategy'];
    tempElement = null;

    return new ElementZoneStrategy(strategy, this.injector);
  }
}
