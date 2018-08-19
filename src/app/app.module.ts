import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, Injector, ApplicationRef } from '@angular/core';

import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { createCustomElement } from '@angular/elements';
import { HelloComponent } from './hello/hello.component';
import { AppComponent } from './app.component';
import { ElementAPlaceholderComponent } from './my-custom-element-placeholder/element-a-placeholder.component';
import { ElementBPlaceholderComponent } from './my-custom-element-placeholder/element-b-placeholder.component';

@NgModule({
  declarations: [
    HelloComponent,
    AppComponent,
    ElementAPlaceholderComponent,
    ElementBPlaceholderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  entryComponents: [HelloComponent, AppComponent]
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

