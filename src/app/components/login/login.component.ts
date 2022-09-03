import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  submitted = false;

  constructor(private userService: UserService) { }
  
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

    this.userService.login(user).subscribe()
  }

  get username() { return this.form.get('username')!; }
  get password() { return this.form.get('password')!; }

}