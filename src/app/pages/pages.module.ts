import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomePacienteComponent } from './home-paciente/home-paciente.component';
import { HomeProfesionalComponent } from './home-profesional/home-profesional.component';
import { NgDropFileDirective } from '../directives/ng-drop-files.directive';



@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        SendEmailComponent,
        ForgotPasswordComponent,
        HomeAdminComponent,
        HomePacienteComponent,
        HomeProfesionalComponent,
        NgDropFileDirective
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        SendEmailComponent,
        ForgotPasswordComponent,
        HomeAdminComponent,
        HomePacienteComponent,
        HomeProfesionalComponent
    ]
})
export class PagesModule { }
