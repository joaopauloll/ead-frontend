import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:5000/';
  constructor(private http: HttpClient) { }

  create(user: User) {
      return this.http.post(this.url + "api/users", user);
  }
}
