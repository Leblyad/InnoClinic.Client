import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { StartPageComponent } from './components/pages/start-page/start-page/start-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReceptionistModule } from './modules/receptionist/receptionist.module';
import { LoginModule } from './modules/login/login.module';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { TimePickerCustomModule } from './shared/time-picker/time-picker.module';
import { NotRegPatientModule } from './modules/not-reg-patient/not-reg-patient.module';
import { SignupModule } from './modules/signup/signup.module';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReceptionistModule,
    NotRegPatientModule,
    LoginModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    TimePickerCustomModule,
    SignupModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
