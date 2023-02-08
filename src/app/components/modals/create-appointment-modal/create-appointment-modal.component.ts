import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IAppointmentForCreate } from 'src/app/models/dto/appointment-for-create-dto';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';

@Component({
  selector: 'app-create-appointment-modal',
  templateUrl: './create-appointment-modal.component.html',
  styleUrls: ['./create-appointment-modal.component.css']
})
export class CreateAppointmentModalComponent implements OnInit {
  _appointmentService: AppointmentService;
  ngUnsubscribe$ = new Subject();
  appForCreation: IAppointmentForCreate = {} as IAppointmentForCreate;
  
  constructor( private appoitnmentService: AppointmentService
    ) { 
      this._appointmentService = appoitnmentService;
    }

  ngOnInit() {
  }

}
