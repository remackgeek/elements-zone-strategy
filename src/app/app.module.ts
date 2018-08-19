import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, Injector, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { createCustomElement } from '@angular/elements';
import { HelloComponent } from './hello/hello.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    HelloComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  entryComponents: [HelloComponent, AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap(app: ApplicationRef) {

    const strategyFactory = new ElementZoneStrategyFactory(HelloComponent, this.injector);
    const helloElement = createCustomElement(HelloComponent, { injector: this.injector, strategyFactory });
    customElements.define('my-hello', helloElement);

    const helloElement2 = createCustomElement(HelloComponent, { injector: this.injector });
    customElements.define('my-hello-two', helloElement2);

    app.bootstrap(AppComponent);
  }
}

