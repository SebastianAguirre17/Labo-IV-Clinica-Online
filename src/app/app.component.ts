import { Component } from '@angular/core';

declare function initCustomFunction();
    

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor() {
        initCustomFunction();

    }
}
