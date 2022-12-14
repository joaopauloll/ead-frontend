import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  submitted = false;
  loading = false;
  response: any;
  user: any;
  token: any;
  error: any;
  errors: any[] = [];

  constructor(private authService: AuthService, private router: Router) { }
  
  form!: FormGroup
  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  submit() {
    this.loading = true
    this.submitted = true
    // console.log(this.form.controls['username'].errors?.['required'])

    let user: User = this.form.value;

    const getResponse = (response: any) => {
      console.log(response)
      console.log(this.authService.userValue)
      this.response = response;

      this.router.navigate(['/'], { state: response }).then(() => {
        window.location.reload();
      });
    }

    const showError = (response: any) => {
      this.errors = Object.values(response.error)
      console.log(Object.values(response.error))
      this.errors.forEach(error => {
        if (Array.isArray(error)) {
          var index = this.errors.indexOf(error)
          if (index != -1) {
            this.errors[index] = error[0];
          }
        };
        this.loading = false
      })
    }

   this.authService.login(user).subscribe({ next: getResponse, error: showError })
  }

  get username() { return this.form.get('username')!; }
  get password() { return this.form.get('password')!; }

}