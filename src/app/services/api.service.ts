import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASEURL:String = "http://" + window.location.hostname + ":4000";
  constructor(private http:HttpClient) { }

  verifySMTP(data) {
    return this.http.post(`${this.BASEURL}/verify-smtp`,data);
  }
}
