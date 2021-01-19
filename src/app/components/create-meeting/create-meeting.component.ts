import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from './../../services/api/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

interface Room {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css'],
})
export class CreateMeetingComponent implements OnInit {
  rooms: Room[] = [
    { value: 'Room 1', viewValue: 'Room 1' },
    { value: 'Room 2', viewValue: 'Room 2' },
    { value: 'Room 3', viewValue: 'Room 3' },
    { value: 'Room 4', viewValue: 'Room 4' },
    { value: 'Room 5', viewValue: 'Room 5' },
    { value: 'Room 6', viewValue: 'Room 6' },
    { value: 'Room 7', viewValue: 'Room 7' },
    { value: 'Room 8', viewValue: 'Room 8' },
  ];

  public profileForm: FormGroup;

  constructor(private fb: FormBuilder, private service: ApiService, public datepipe: DatePipe) {
    this.profileForm = this.fb.group({
      meetingTitle: ['', Validators.required],
      meetingDate: ['', Validators.required], // sa fie date timepicker
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      roomName: ['', Validators.required],
      //emails: ['', Validators.email]
      emails: this.fb.array([
        this.fb.control('')
      ])
    });
  }
  mergeDataAndTime(date: string, time: string): string{
    const timeArray = time.toString().split(' ') ;
    const hoursAndMinutesArray = timeArray[0].split(':');
    let time24 = '';

    if (timeArray[1] === 'PM')
    {
        hoursAndMinutesArray[0] = (1 * parseInt(hoursAndMinutesArray[0]) + 12).toString();
    }
    else
    {
        hoursAndMinutesArray[0] = hoursAndMinutesArray[0];
    }

    if(parseInt(hoursAndMinutesArray[0]) < 10)
    {
      time24 = hoursAndMinutesArray[0];
    }
    else
    {
      time24 = hoursAndMinutesArray[0];
    }

    time24 += ':' + hoursAndMinutesArray[1];
    const finalDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    console.log(finalDate);
    return finalDate.toString() + ' ' + time24.toString();
  }

  onSubmit(): void {
    const formValues = this.profileForm.controls;
    const meetingObject = {
                            meetingTitle: formValues.meetingTitle.value,
                            startTime: this.mergeDataAndTime(formValues.meetingDate.value, formValues.startTime.value),
                            endTime: this.mergeDataAndTime(formValues.meetingDate.value, formValues.endTime.value),
                            roomName: formValues.roomName.value,
                            emails: formValues.emails.value
                          };


    this.service.postMeeting(meetingObject);
  }

  ngOnInit(): void {
    console.log('create called');
  }

  get emails(): FormArray
  {
    return this.profileForm.get('emails') as FormArray;
  }

  addNewEmail(): void
  {
    this.emails.push(this.fb.control(''));
  }
}
