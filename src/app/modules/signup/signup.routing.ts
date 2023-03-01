import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from 'src/app/components/pages/login-page/login-page.component';
import { SignupComponent } from './signup.component';

const routes: Routes = [
  { path: '**', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignRoutes {}