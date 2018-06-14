import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `
    <input [(ngModel)]="name" />
    <div>
    <span>{{name}}</span>
    </div>
  `,
  styles: []
})
export class HelloComponent  {
  public name = '';

  constructor() { }



}
