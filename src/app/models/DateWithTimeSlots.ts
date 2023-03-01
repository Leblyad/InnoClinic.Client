import { Time } from '@angular/common';

export interface DateWithTimeSlots {
  date: Date;
  timeWithStatuses?: TimeWithStatus[];
  isFull: boolean;
}

export interface TimeWithStatus {
  time: Time;
  isFree: boolean;
}