import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private route: Router, private http: HttpClient) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable(); 
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(user: User) {
    return this.http.post(environment.apiUrl + "/auth/login", user).pipe(map(_ => {
      // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
  }));  
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null as any);
    this.route.navigate(['/login']);
  }

}
