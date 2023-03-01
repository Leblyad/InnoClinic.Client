import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceptionistComponent } from './receptionist.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { AppointmentViewTableComponent } from 'src/app/components/tables/appointment-view-table/appointment-view-table.component';
import { AppointmentViewControlPanelComponent } from 'src/app/components/control-panels/appointment-view-control-panel/appointment-view-control-panel.component';
import { DoctorViewTableComponent } from 'src/app/components/tables/doctor-view-table/doctor-view-table.component';
import { ServiceViewTableComponent } from 'src/app/components/tables/service-view-table/service-view-table.component';
import { CreateAppointmentModalComponent } from 'src/app/components/modals/create-appointment-modal/create-appointment-modal.component';
import { EditAppointmentModalComponent } from 'src/app/components/modals/edit-appointment-modal/edit-appointment-modal';
import { ReceptionistRoutes } from './receptionist.routng';

@NgModule({
  imports: [
    ReceptionistRoutes,
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
    MatSelectModule
  ],
  declarations: [
    ReceptionistComponent,
    AppointmentViewTableComponent,
    AppointmentViewControlPanelComponent,
    EditAppointmentModalComponent,
    CreateAppointmentModalComponent
  ]
})
export class ReceptionistModule { }
