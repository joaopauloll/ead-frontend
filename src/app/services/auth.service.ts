import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { userResponse } from '../models/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<userResponse>;
  public userObs: Observable<userResponse>;

  updatedUser: userResponse = undefined || {user: {id: -1, name: "", email: "", username: "", password: "", role: -1}, token: ""};

  constructor(private route: Router, private http: HttpClient) { 
    this.userSubject = new BehaviorSubject<userResponse>(JSON.parse(localStorage.getItem('user')!));
    this.userObs = this.userSubject.asObservable(); 
  }

  public get userValue(): userResponse {
    return this.userSubject.value;
  }

  login(user: User) {
    return this.http.post(environment.apiUrl + "/auth/login", user)
    .pipe(map(userResponse => {
      // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(userResponse));
      this.userSubject.next(userResponse as userResponse);
      return userResponse;
  }));  
  }

  updateStorage(user: User, token: string) {
    this.updatedUser.user = user;
    this.updatedUser.token = token;
    localStorage.setItem('user', JSON.stringify(this.updatedUser));
    this.userSubject.next(this.updatedUser);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null as any);
    this.route.navigate(['/login']).then(() => {
      // window.location.reload();
    });;
  }

}
