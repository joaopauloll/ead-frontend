import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
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
  response: any;
  user: any;
  token: any;
  error: any;

  constructor(private authService: AuthService, private route: Router) { }
  
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
    this.submitted = true
    console.log(this.form.valid);
    // console.log(this.form.controls['username'].errors?.['required'])

    let user: User = this.form.value;

    const getResponse = (response: any) => {
      console.log(response)
      console.log(this.authService.userValue)
      this.response = response;
      this.user = response.user
      this.token = response.token

      // window.location.reload();
      this.route.navigate(['/'], { state: response })
    }

    const showError = (response: any) => {
      this.error = response;
      console.log(this.error)
    }

   this.authService.login(user).subscribe({ next: getResponse, error: showError })
  }

  get username() { return this.form.get('username')!; }
  get password() { return this.form.get('password')!; }

}