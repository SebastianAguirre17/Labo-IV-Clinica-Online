import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomePacienteComponent } from './components/home-paciente/home-paciente.component';
import { HomeProfesionalComponent } from './components/home-profesional/home-profesional.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: 'verification', component: SendEmailComponent }, 
    { path: 'forgot', component: ForgotPasswordComponent },
    { path: 'home-admin', component: HomeAdminComponent },
    { path: 'home-paciente', component: HomePacienteComponent },
    { path: 'home-profesional', component: HomeProfesionalComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
