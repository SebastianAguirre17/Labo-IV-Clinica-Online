import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerificationComponent } from './verification/verification.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, data: { animation: 'Login' } },
    { path: 'register', component: RegisterComponent, data: { animation: 'Register' } },
    { path: 'verification', component: VerificationComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
