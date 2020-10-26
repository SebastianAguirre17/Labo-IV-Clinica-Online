import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    { path: '**', component: NopagefoundComponent } 
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
        PagesRoutingModule,
        AuthRoutingModule  
    ]
})
export class AppRoutingModule { }
