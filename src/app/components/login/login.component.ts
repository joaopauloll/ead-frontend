import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
) { 
    // redirect to home if already logged in
    if (this.authService.userValue) { 
        this.router.navigate(['/']);
    }
}

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  submit() {
    if (this.form.invalid) {
      return;
    }

    const navigate = (data: any) => {
      this.router.navigate([this.returnUrl])
    }
    const renderError = (error: any) => {
      this.error = error;
      this.loading = false;
    }

    this.loading = true;
        this.authService.login(this.form.value.username, this.form.value.password)
            .pipe(first())
            .subscribe({next: navigate, error: renderError});
  }

}