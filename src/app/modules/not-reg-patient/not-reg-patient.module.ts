import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotRegPatientComponent } from './not-reg-patient.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DoctorViewTableComponent } from 'src/app/components/tables/doctor-view-table/doctor-view-table.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotRegPatientRouting } from './not-reg-patient.routing';
import { ServiceViewTableComponent } from 'src/app/components/tables/service-view-table/service-view-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CreateAppointmentByPatientComponent } from 'src/app/components/modals/create-appointment-by-patient/create-appointment-by-patient.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule,
    NotRegPatientRouting
  ],
  declarations: [
    NotRegPatientComponent,
    DoctorViewTableComponent,
    ServiceViewTableComponent,
    CreateAppointmentByPatientComponent
  ]
})
export class NotRegPatientModule { }
