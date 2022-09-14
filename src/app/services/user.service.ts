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


  getUsers() {
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
        if (user.active == true) {
          user.active = "Ativo"
        } else {
          user.active = "Inativo"
        }
      })
      return users;
  }));
  }

  getLogs() {
    return this.http.get<any[]>(environment.apiUrl + "/api/logs").pipe(map(logs => {
      logs.forEach(log => {
        if (log.user === null) {
          log.username = "Anônimo"
        } else {
          log.username = log.user.username
        }
      })
      return logs;
  }));
  };

  update(user: User) {
    console.log(user)
    return this.http.put(environment.apiUrl + "/api/users/" + user.id, user);
  };

  delete(id: any) {
    console.log(id)
    return this.http.delete(environment.apiUrl + "/api/users/" + id);
  };

}
