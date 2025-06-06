import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { registrationModel, loginModel, userDetailsModel } from './sharedmodel';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  roleSelected$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  https = inject(HttpClient);
  title = 'one';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  getAllUsers(url: string) {
    return this.https.get<userDetailsModel>(url);
  }

  postUsers(url: string, body: any) {
    let httpOptions = { headers: this.headers };
    return this.https.post<any>(url, body, httpOptions);
  }
}
