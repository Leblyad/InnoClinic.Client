import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './components/pages/start-page/start-page/start-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'receptionist', canActivate: [AuthGuard], data: { Roles: ['Receptionist'] },
    loadChildren: () => import('./modules/receptionist/receptionist.module').then(m => m.ReceptionistModule)
  },
  {
    path: 'doctor', canActivate: [AuthGuard], data: { Roles: ['Doctor'] },
    loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule)
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
