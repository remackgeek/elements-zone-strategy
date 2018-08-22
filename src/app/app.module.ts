import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, Injector } from '@angular/core';

import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { createCustomElement } from '@angular/elements';
import { HelloComponent } from './hello/hello.component';

@NgModule({
  declarations: [
    HelloComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  entryComponents: [HelloComponent],
  
})
export class AppModule {
  constructor(private injector: Injector) { }
  ngDoBootstrap() {

    const strategyFactory = new ElementZoneStrategyFactory(HelloComponent, this.injector);
    const helloElement = createCustomElement(HelloComponent, { injector: this.injector, strategyFactory });
    customElements.define('my-hello', helloElement);

    const helloElement2 = createCustomElement(HelloComponent, { injector: this.injector });
    customElements.define('my-hello-two', helloElement2);
  }
}

