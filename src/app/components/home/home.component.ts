import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api/api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInfoService } from './../../services/user/user-info.service';

interface Event {
  meetingTitle: string;
  startTime: string;
  endTime: string;
  email: string;
  roomName: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public mapOfEvents;

  constructor(private service: ApiService) {
    this.mapOfEvents = new Map<string, string>();
  }
  private subs: Subscription;
  public events: Event[] = [];
  public event: Event;


  ngOnInit(): void {
    this.service.getMeetings().subscribe(meeting => {
      let i = 0;
      meeting.forEach(meet => {
        this.event = meet;
        this.events[i] = this.event;
        i += 1;
      });
    });
  }





  // ngOnInit(): void {
  //   this.subs = this.service
  //     .getEvents('something')
  //     .subscribe((events) => {
  //       console.log(events);
  //        this.events = events
  //     })
  // }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
