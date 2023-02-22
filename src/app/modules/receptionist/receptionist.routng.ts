import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ReceptionistComponent } from './receptionist.component';

const routes: Routes = [
  { path: 'view', component: ReceptionistComponent, canActivate: [AuthGuard], data: { Roles: ['Receptionist'] }},
  { path: '**', redirectTo: 'view' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionistRoutes {}
