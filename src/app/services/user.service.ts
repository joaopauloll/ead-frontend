import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: User) {
    return this.http.post(environment.apiUrl + "/api/users", user);
  }

}
