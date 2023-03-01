import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NotAuthGuard } from 'src/app/guards/not-auth.guard';
import { NotRegPatientComponent } from './not-reg-patient.component';

const routes: Routes = [
  { path: 'view', component: NotRegPatientComponent},
  { path: '**', redirectTo: 'view' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotRegPatientRouting {}