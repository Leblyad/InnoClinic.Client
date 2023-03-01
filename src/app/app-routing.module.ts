import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { StartPageComponent } from './components/pages/start-page/start-page/start-page.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { ReceptionistModule } from './modules/receptionist/receptionist.module';

const routes: Routes = [
  {
    path: 'receptionist', canActivate: [AuthGuard], data: { Roles: ['Receptionist'] },
    loadChildren: () => import('./modules/receptionist/receptionist.module').then(m => m.ReceptionistModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./modules/not-reg-patient/not-reg-patient.module').then(m => m.NotRegPatientModule)
  },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule) },
  { path: '', component: StartPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
