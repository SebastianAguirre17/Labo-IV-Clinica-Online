import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TituloComponent } from './titulo/titulo.component';


@NgModule({
    declarations: [
        NavbarComponent,
        SidebarComponent,
        TituloComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        SidebarComponent,
        TituloComponent,
        NavbarComponent
    ]
})
export class ComponentsModule { }
