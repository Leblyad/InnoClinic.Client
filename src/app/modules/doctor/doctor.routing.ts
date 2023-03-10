import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentViewByDoctorComponent } from 'src/app/components/tables/appointment-view-by-doctor/appointment-view-by-doctor.component';

const routes: Routes = [
  { path: 'view', component: AppointmentViewByDoctorComponent},
  { path: '**', component: AppointmentViewByDoctorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutes {}