import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../app.animations';

declare function initCustomFunction();

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styles: [
    ],
    animations: [
        slideInAnimation
    ]
})
export class PagesComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        initCustomFunction();
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }

}
