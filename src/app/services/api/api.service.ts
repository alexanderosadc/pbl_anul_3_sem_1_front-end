import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getEvents(person: string): Observable<any> {
    const link: string = `de la max}`;
    const headers = {};
    return this.httpClient.get(link);
  }

  getMap(category: string): Observable<any> {
    const link: string = `de la max}`;
    const headers = {};
    return this.httpClient.get(link);
  }

  getMeetings(): Observable<any> {
    const link = 'https://localhost:44378/api/admin/meetings';
    //console.log(this.httpClient.get(link));
    return this.httpClient.get(link);
  }

  postevent(category: string): Observable<any> {
    const link: string = `de la max}`;
    const headers = {};
    return this.httpClient.post(link, {});
  }
}
