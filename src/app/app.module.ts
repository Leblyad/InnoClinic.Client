import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppointmentViewTableComponent } from './components/tables/appointment-view-table/appointment-view-table.component';
import {MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { DoctorViewTableComponent } from './components/tables/doctor-view-table/doctor-view-table.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { ServiceViewTableComponent } from './components/tables/service-view-table/service-view-table.component';
import { ReceptionistPageComponent } from './components/pages/receptionist-page/receptionist-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { EditAppointmentModalComponent } from './components/modals/edit-appointment-modal/edit-appointment-modal';
import { CreateAppointmentModalComponent } from './components/modals/create-appointment-modal/create-appointment-modal.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AppointmentViewControlPanelComponent } from './components/control-panels/appointment-view-control-panel/appointment-view-control-panel.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentViewTableComponent,
    DoctorViewTableComponent,
    ServiceViewTableComponent,
    ReceptionistPageComponent,
    EditAppointmentModalComponent,
    CreateAppointmentModalComponent,
    AppointmentViewControlPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
