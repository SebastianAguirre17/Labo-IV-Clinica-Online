import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        SendEmailComponent,
        ForgotPasswordComponent
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
        ForgotPasswordComponent
    ]
})
export class PagesModule { }
