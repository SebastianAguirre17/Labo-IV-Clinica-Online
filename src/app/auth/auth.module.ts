import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgDropFileDirective } from './directives/ng-drop-file.directive';
import { VerificationComponent } from './verification/verification.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        NgDropFileDirective,
        VerificationComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgxCaptchaModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthModule { }
