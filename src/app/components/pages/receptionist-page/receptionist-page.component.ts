import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentModalComponent } from '../../modals/create-appointment-modal/create-appointment-modal.component';

@Component({
  selector: 'app-receptionist-page',
  templateUrl: './receptionist-page.component.html',
  styleUrls: ['./receptionist-page.component.css']
})
export class ReceptionistPageComponent implements OnInit {

  constructor(
    private matDialog: MatDialog 
    ) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.matDialog.open(CreateAppointmentModalComponent);
  }
}
