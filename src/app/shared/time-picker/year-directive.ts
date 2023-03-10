import { Directive } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const FORMAT = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Directive({
  selector: '[appDatepickerOnlyYear]',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: FORMAT }],
})
export class DatepickerOnlyYearDirective {

  constructor() { }

}
