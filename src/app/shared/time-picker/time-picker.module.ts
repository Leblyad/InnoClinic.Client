import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { TimePickerComponent } from './time-picker.component';

@NgModule({
    imports: [
        MatButtonModule,
        MatGridListModule,
        CommonModule
    ],
    declarations: [TimePickerComponent]
})
export class TimePickerCustomModule { }