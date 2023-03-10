import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDoctorPageComponent } from 'src/app/components/pages/create-doctor-page/create-doctor-page.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ReceptionistComponent } from './receptionist.component';

const routes: Routes = [
  { path: 'view', component: ReceptionistComponent, canActivate: [AuthGuard], data: { Roles: ['Receptionist'] }},
  { path: 'create-doctor', component: CreateDoctorPageComponent, canActivate: [AuthGuard], data: { Roles: ['Receptionist'] }},
  { path: '**', redirectTo: 'view' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionistRoutes {}
