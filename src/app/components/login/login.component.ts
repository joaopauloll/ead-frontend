import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  submitted = false;
  
  form!: FormGroup
  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submit() {
    this.submitted = true
    console.log(this.form.valid);
    // console.log(this.form.controls['username'].errors?.['required'])
  }

  get username() { return this.form.get('username')!; }
  get password() { return this.form.get('password')!; }

}