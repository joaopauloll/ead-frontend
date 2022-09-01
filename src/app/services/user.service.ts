import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'https://localhost:5000/';
  constructor(private http: HttpClient) { }

  create(dividendo: number, divisor: number) {
      return this.http.get(this.url + "Dividir?Dividendo=" + dividendo + "&Divisor=" + divisor);
  }
}
