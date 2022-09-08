import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private userService: UserService, private router: Router) { }

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      var y: number = +this.form.value.role;
      this.form.value.role = y;
      console.log(this.form.value);
    }
    let user: User = this.form.value;

    this.userService.create(user).subscribe()

    this.router.navigate(["/login"])
  }
}

