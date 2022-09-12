import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";

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
  routerSubscription: any;

  constructor(
    private userService: UserService, 
    private authService: AuthService, 
    public router: Router, 
    private _snackBar: MatSnackBar,
    private navbar: NavBarComponent) { 
   }

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
      newPassword: new FormControl("", [
        Validators.minLength(4),
      ]),
    });
  }

  submit() {
    this.loading = true
    this.submitted = true

    let updatedUser: User = this.form.value;
    updatedUser.id = this.user.id
    if (this.form.value.newPassword) {
      updatedUser.password = this.form.value.newPassword
    }

    const updateUser = (response: any) => {
      updatedUser.name = response.name
      updatedUser.email = response.email
      updatedUser.username = response.username
      updatedUser.role = response.role
      this.authService.updateStorage(updatedUser, this.authService.userValue.token)
      this.router.navigate(['/profile'], { state: response }).then(() => {
        this.navbar.ngOnInit() 
        this.openSnackBar("Usuário atualizado com sucesso!")
      });

    }

    const showError = (response: any) => {
      this.error = response;
      console.log(this.error)
    }

   this.userService.update(updatedUser).subscribe({ next: updateUser, error: showError })
  }

  openSnackBar(message: string) {
    if (!this.error) {
      this._snackBar.open(message);
      this._snackBar._openedSnackBarRef?._dismissAfter(5000);
    }  
  }

  print() {
    console.log(localStorage.getItem("user"))
    console.log(this.authService.userValue)
  }

}
