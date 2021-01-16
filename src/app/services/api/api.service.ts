import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getEvents(person: string): Observable<any> {
    const link = `de la max}`;
    const headers = {};
    return this.httpClient.get(link);
  }

  getMap(category: string): Observable<any> {
    const link = `de la max}`;
    const headers = {};
    return this.httpClient.get(link);
  }

  getMeetings(): Observable<any> {
    const link = 'https://localhost:44378/api/admin/meetings';
    //console.log(this.httpClient.get(link));
    return this.httpClient.get(link);
  }

  postevent(body: object): Observable<any> {
    const link = ``;
    return this.httpClient.post(link, {

    });
  }

  postMeeting(body: object): Observable<any>{
    const link = 'https://localhost:44378/api/admin/insertMeeting';
    console.log(body);
    this.httpClient.post(link, body).subscribe(
      (val) => {
        console.log('POST call successful value returned in body',
          val);
      },
      response => {
        console.log('POST call in error', response);
      },
      () => {
        console.log('The POST observable is now completed.');
      }
    );
    return this.httpClient.post(link, body);
  }
}
