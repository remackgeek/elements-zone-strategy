import { Injector, Type } from '@angular/core';
import { createCustomElement, NgElementStrategy, NgElementStrategyFactory } from '@angular/elements';
import { ElementZoneStrategy } from './element-zone-strategy';

export class ElementZoneStrategyFactory implements NgElementStrategyFactory {
  static counter = 1;
  private ngElement;

  protected generateName() {
    let result = 'dummy-name-';

    const temp = ElementZoneStrategyFactory.counter + '';
    const mangled = temp.replace(/[0-9]/g, function (c) {
      return 'abcdefghij'.charAt(
             '0123456789'.indexOf(c));
      });

    result = result + mangled;
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
