import { Component, OnInit } from '@angular/core';

declare function initCustomFunction();

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styles: [
    ]
})
export class PagesComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        initCustomFunction();
    }

}
