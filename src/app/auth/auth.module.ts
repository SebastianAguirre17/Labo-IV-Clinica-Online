import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDropFileDirective } from './directives/ng-drop-file.directive';
import { VerificationComponent } from './verification/verification.component';

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
        ReactiveFormsModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthModule { }
