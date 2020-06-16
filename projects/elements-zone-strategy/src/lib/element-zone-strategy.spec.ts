import { async, TestBed } from '@angular/core/testing';

import { ElementZoneStrategyFactory } from './element-zone-strategy-factory';
import { Component,  NgModule, Injector, Type } from '@angular/core';
import { ElementZoneStrategy } from './element-zone-strategy';
import { NgElementStrategy, NgElementStrategyEvent, NgElementStrategyFactory, createCustomElement } from '@angular/elements';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

class CreateEventsFactory  implements NgElementStrategyFactory {
  static counter = 1;
  private ngElement;

  protected string4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  protected generateName() {
    let result = 'dummy-name-nx';
    const temp = ElementZoneStrategyFactory.counter + '';
    result = result + temp + '-' + this.string4()  + '-' + this.string4() + '-' + this.string4();
    ElementZoneStrategyFactory.counter++;
    return result;
  }

  constructor(private component: Type<any>, private injector: Injector) {
    this.ngElement = createCustomElement(this.component, { injector: this.injector });
    customElements.define(this.generateName(), this.ngElement);
  }

  create(injector: Injector): NgElementStrategy {
    let tempElement = new this.ngElement(this.injector);
    const strategy = tempElement['ngElementStrategy'];
    strategy.events = new BehaviorSubject( {name: 'foo', value: 'value'} as NgElementStrategyEvent);
    tempElement = null;
    return new ElementZoneStrategy(strategy, this.injector);
  }
}

class ConnectEventsFactory  implements NgElementStrategyFactory {
  static counter = 1;
  private ngElement;

  protected string4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  protected generateName() {
    let result = 'dummy-name-nx';
    const temp = ElementZoneStrategyFactory.counter + '';
    result = result + temp + '-' + this.string4()  + '-' + this.string4() + '-' + this.string4();
    ElementZoneStrategyFactory.counter++;
    return result;
  }

  constructor(private component: Type<any>, private injector: Injector) {
    this.ngElement = createCustomElement(this.component, { injector: this.injector });
    customElements.define(this.generateName(), this.ngElement);
  }

  create(injector: Injector): NgElementStrategy {
    let tempElement = new this.ngElement(this.injector);
    const strategy = tempElement['ngElementStrategy'];
    strategy.events = null;
    tempElement = null;
    return new ElementZoneStrategy(strategy, this.injector);
  }
}


@Component({
  template: `<p>foobar</p>`,
})
class DummyComponent {
}

@NgModule({
  declarations: [
    DummyComponent,
  ],
  entryComponents: [
    DummyComponent
  ],
  exports: [
    DummyComponent
  ]
})
class DummyModule { }



describe('ElementZoneStrategy', () => {
    let strategy: ElementZoneStrategy;
    let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [DummyModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const factory = new ElementZoneStrategyFactory(DummyComponent, TestBed.get(Injector));
    strategy = factory.create(TestBed.get(Injector)) as ElementZoneStrategy;
    // tslint:disable-next-line: arrow-return-shorthand
    spy = spyOn(strategy['ngZone'], 'run').and.callFake((fn: any) => { return fn(); });
  });

  it('should connect in zone', () => {
    const events = new BehaviorSubject( {name: 'foo', value: 'bar'} as NgElementStrategyEvent);
    const connectSpy = spyOn(strategy['strategy'], 'connect');
    strategy['strategy'].events = events;

    strategy.connect(document.createElement('div'));

    expect(connectSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(strategy['events']).toBeTruthy();
  });

  it('should disconnect in zone', () => {
    const disconnectSpy = spyOn(strategy['strategy'], 'disconnect');
    strategy.connect(document.createElement('div'));
    strategy.disconnect();
    expect(disconnectSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should set inputValue', () => {
    const setSpy = spyOn(strategy['strategy'], 'setInputValue').and.stub();
    strategy.connect(document.createElement('div'));
    strategy.setInputValue('a', 'b');
    expect(setSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should get inputValue', () => {
    const getSpy = spyOn(strategy['strategy'], 'getInputValue').and.returnValue('value');
    strategy.connect(document.createElement('div'));
    const result = strategy.getInputValue('key');
    expect(getSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(result).toEqual('value');
  });

  it('set events on create', () => {
    const factory = new CreateEventsFactory(DummyComponent, TestBed.get(Injector));
    strategy = factory.create(TestBed.get(Injector)) as ElementZoneStrategy;
    expect(strategy.events).toBeTruthy();
    const firstEvents = strategy.events;


    const events = new BehaviorSubject( {name: 'foo', value: 'bar'} as NgElementStrategyEvent);
    strategy['strategy'].events = events;

    strategy.connect(document.createElement('div'));

    expect(strategy.events).toEqual(firstEvents);
    strategy.events.pipe(take(1)).subscribe( value => { expect(value).toEqual({name: 'foo', value: 'value'} as NgElementStrategyEvent);});
  });

  it('set events on connect', () => {
    const factory = new ConnectEventsFactory(DummyComponent, TestBed.get(Injector));
    strategy = factory.create(TestBed.get(Injector)) as ElementZoneStrategy;
    expect(strategy.events).toBeNull;

    const events = new BehaviorSubject( {name: 'foo', value: 'bar'} as NgElementStrategyEvent);
    strategy['strategy'].events = events;

    strategy.connect(document.createElement('div'));

    expect(strategy.events).toEqual( strategy['strategy'].events);
    strategy.events.pipe(take(1)).subscribe( value => { expect(value).toEqual({name: 'foo', value: 'bar'} as NgElementStrategyEvent);});
  });

});
