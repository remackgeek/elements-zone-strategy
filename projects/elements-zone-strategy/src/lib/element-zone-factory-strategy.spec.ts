import { async, TestBed } from '@angular/core/testing';

import { ElementZoneStrategyFactory } from './element-zone-strategy-factory';
import { Component,  NgModule, Injector } from '@angular/core';

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



describe('ElementZoneStrategyFactory', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [DummyModule]
    })
    .compileComponents();
  }));

  it('should create a factory instance', () => {
    const factory = new ElementZoneStrategyFactory(DummyComponent, TestBed.get(Injector));
    expect(factory).toBeTruthy();
  });

  it('should create a strategy instance', () => {
    const factory = new ElementZoneStrategyFactory(DummyComponent, TestBed.get(Injector));
    const strategy = factory.create(TestBed.get(Injector));
    expect(strategy).toBeTruthy();
  });
});





