import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo',
    template: `<div #container>
                <button (click)="viewElement()"> Show/Hide Elements</button>
                <div *ngIf="elementVisible">
                    <my-custom-element-a></my-custom-element-a>
                    <my-custom-element-b></my-custom-element-b>
                </div>
              </div>`
})
export class AppComponent implements OnInit {

    elementVisible: boolean;

    constructor() { }

    ngOnInit() {
        this.loadMyElements();
    }

    viewElement() {
        this.elementVisible = !this.elementVisible;
    }

    private loadMyElements() {
        const content = document.head;

        const script = document.createElement('script');
        // bundle obtained from https://github.com/tnicola/my-custom-element
        script.src = 'assets/my-custom-element.js';
        content.appendChild(script);

        script.onerror = () => console.error(`error loading my-custom-element`);
    }
}
