import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  error: any;

  constructor(private userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

  alert_msg = "Usuário cadastrado com sucesso!"

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

    const showError = (response: any) => {
      this.error = response.error
      const errors = response.error;
      this.error = Object.keys(errors).map(key => errors[key]);
      console.log(response.error, 1)
    }

    this.userService.create(user).subscribe({
      next: _ => this.router.navigate(["/login"]), 
      error: showError})
  }

  openSnackBar(message: string) {
    if (!this.error) {
      this._snackBar.open(message);
      this._snackBar._openedSnackBarRef?._dismissAfter(5000);
    }  
  }
}



