import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppComponent } from './app.component';
import { MyRatingComponent, RatingComponent, RatingService } from './my-rating.component';

import {ElementZoneStrategyFactory} from 'elements-zone-strategy';
import { createCustomElement  } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    MyRatingComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
  ],
  entryComponents: [AppComponent, MyRatingComponent],
  providers: [RatingService],
  // bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) { }
  ngDoBootstrap() {

    const strategyFactory = new ElementZoneStrategyFactory(MyRatingComponent, this.injector);

    const RatingElement = createCustomElement(MyRatingComponent, { injector: this.injector, strategyFactory   });
    customElements.define('my-rating', RatingElement);

    const RatingElement2 = createCustomElement(MyRatingComponent, { injector: this.injector  });
    customElements.define('my-ratingtwo', RatingElement2);
  }
 }

