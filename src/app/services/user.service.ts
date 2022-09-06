import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: User) {
    return this.http.post(environment.apiUrl + "/api/users", user);
  }


  getAll() {
    return this.http.get<any[]>(environment.apiUrl + "/api/users").pipe(map(users => {
      users.forEach(user => {
        if (user.role === 0) {
          user.role = "Diretor"
        } else {
          if (user.role === 1) {
            user.role = "Professor"
          } else {
            user.role = "Estudante"
          }
        }
      })
      return users;
  }));
  }

}
