import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { StartPageComponent } from './components/pages/start-page/start-page/start-page.component';
import { ReceptionistModule } from './modules/receptionist/receptionist.module';
import { LoginModule } from './modules/login/login.module';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { TimePickerCustomModule } from './shared/time-picker/time-picker.module';
import { NotRegPatientModule } from './modules/not-reg-patient/not-reg-patient.module';
import { SignupModule } from './modules/signup/signup.module';
import { DoctorModule } from './modules/doctor/doctor.module';

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
    SignupModule,
    DoctorModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
