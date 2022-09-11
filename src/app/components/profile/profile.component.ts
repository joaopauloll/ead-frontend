import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = this.authService.userValue.user
  submitted = false;
  loading = false;
  response: any;
  token: any;
  error: any;

  constructor(private userService: UserService, private authService: AuthService, public router: Router) { }

  form!: FormGroup
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", [
        Validators.required,
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
      ]),
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

    let updatedUser: User = this.form.value;
    updatedUser.id = this.user.id

    const updateUser = (response: any) => {
      updatedUser.name = response.name
      updatedUser.email = response.email
      updatedUser.username = response.username
      this.authService.updateStorage(updatedUser, this.authService.userValue.token)
      this.router.navigate(['/profile'], { state: response }).then(() => {
        window.location.reload();
      });
    }

    const showError = (response: any) => {
      this.error = response;
      console.log(this.error)
    }

   this.userService.update(updatedUser).subscribe({ next: updateUser, error: showError })
  }

}
