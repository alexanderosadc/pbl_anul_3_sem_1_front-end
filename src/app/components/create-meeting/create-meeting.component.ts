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
    { value: 'Death Star', viewValue: 'Death Star' },
    { value: 'Hall of Justice', viewValue: 'Hall of Justice' },
    { value: 'Spider Skull Island', viewValue: 'Spider Skull Island' },
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
    return finalDate.toString().replace('00:00', time24.toString());
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
