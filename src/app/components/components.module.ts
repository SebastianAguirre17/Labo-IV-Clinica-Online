import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TituloComponent } from './titulo/titulo.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { AgregarAdminComponent } from './agregar-admin/agregar-admin.component';


@NgModule({
    declarations: [
        NavbarComponent,
        SidebarComponent,
        TituloComponent,
        SidebarAdminComponent,
        AgregarAdminComponent
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
        NavbarComponent,
        SidebarAdminComponent,
        AgregarAdminComponent
    ]
})
export class ComponentsModule { }
