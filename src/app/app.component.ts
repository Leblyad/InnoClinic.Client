import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateAppointmentByPatientComponent } from './components/modals/create-appointment-by-patient/create-appointment-by-patient.component';
import { CreateAppointmentModalComponent } from './components/modals/create-appointment-modal/create-appointment-modal.component';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authService: AuthenticationService;

  constructor(authService: AuthenticationService,
    private matDialog: MatDialog,
    private router: Router) {
    this.authService = authService;
  }

  signOut() {
    localStorage.clear();
    this.authService.isAuth$.next(false);
    this.authService.roles$.next('');
  }

  view() {
    if (this.authService.isPatient() || !this.authService.isAuth$.value)
      this.router.navigate(['/patient/view']);

    if (this.authService.isReceptionist())
      this.router.navigate(['/receptionist/view']);

    if (this.authService.isDoctor())
      this.router.navigate(['**']);
  }

  create() {
    if (this.authService.isPatient())
    {
      this.router.navigate(['/patient/view']);
      this.authService.getPatient().subscribe(
        res => {
          const dialog = this.matDialog.open(CreateAppointmentByPatientComponent,
            {
            data: {
              patient: res
            }}
          );
        }
      )
    }
    else if(this.authService.isReceptionist())
    {
      const dialogRef = this.matDialog.open(CreateAppointmentModalComponent);
    }
    else if(!this.authService.isAuth$.value)
      this.router.navigate(['/login']);
  }
}
