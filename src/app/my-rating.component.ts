import {
  Component,
  Injectable,
  Input,
  Output,
  OnInit,
  OnChanges,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Injectable()
export class RatingService {
  updateRatings(rating): boolean[] {
    console.log('-- update rating --', rating);
    return Array.from({ length: 5 }).map((state, index) => index < rating + 1);
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'one-rating',
  template: `
    <div class="rating"
        [ngClass]="{ 'filled': isFilled }"
        (click)="ratingClicked.emit()">
    </div>
  `,
  styles: [
    `
    .rating.filled {
      background: firebrick;
    }
    .rating {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin: 5px;
      cursor: pointer;
      user-select: none;
      background: lightgray;
    }
  `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RatingComponent {
  @Input() isFilled;
  @Output() ratingClicked = new EventEmitter();
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-rating',
  template: `
    <div class="my-rating">
      <one-rating *ngFor="let rating of ratingStates;let ratingIndex=index"
        [isFilled]="rating"
        (ratingClicked)="handleRatingClicked(ratingIndex)">
      </one-rating>
    </div>
  `,
  styles: ['.my-rating { display: flex; padding: 5px;}'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MyRatingComponent implements OnChanges {
  public ratingStates: boolean[];
  private theRating = 1;

  @Input()
  get rating() {
    console.log('-- read rating --');
    return this.theRating;
  }
  set rating(newRating: any) {
    console.log('-- set rating --');
    this.theRating = parseInt(newRating, 10);
    this.ratingChange.emit(newRating);
  }

  @Output() ratingChange = new EventEmitter();

  constructor(private ratingService: RatingService) {}

  ngOnChanges() {
    console.log('-- ngOnChanges --');
    this.ratingStates = this.ratingService.updateRatings(this.theRating);
  }

  handleRatingClicked(newRating) {
    console.log('-- CLICK HANDLER --', newRating);
    this.rating = newRating;
    this.ratingStates = this.ratingService.updateRatings(this.theRating);
  }
}
