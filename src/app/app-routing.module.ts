import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from './auth/send-email/send-email.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
    { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
    { path: 'verification', component: SendEmailComponent },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'profesional', loadChildren: () => import('./profesional/profesional.module').then(m => m.ProfesionalModule) },
    { path: 'paciente', loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule) },
    { path: 'forgotPassword', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
