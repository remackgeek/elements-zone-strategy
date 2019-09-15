import { async, TestBed } from '@angular/core/testing';

import { ElementZoneStrategyFactory } from './element-zone-strategy-factory';
import { Component,  NgModule, Injector } from '@angular/core';
import { ElementZoneStrategy } from './element-zone-strategy';
import { NgElementStrategy, NgElementStrategyEvent } from '@angular/elements';
import { BehaviorSubject } from 'rxjs';

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

});
