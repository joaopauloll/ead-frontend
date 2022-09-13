import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {

  errors!: any[];

  constructor(
    private courseService: CourseService, 
    public router: Router, 
    private _snackBar: MatSnackBar) { }

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
    let course: Course = this.form.value;

    const showError = (response: any) => {
      this.errors = Object.values(response.error)
      console.log(Object.values(response.error))
      this.errors.forEach(error => {
        if (Array.isArray(error)) {
          var index = this.errors.indexOf(error)
          if (index != -1) {
            this.errors[index] = error[0];
          }
        }
      })
    }

    this.courseService.create(course).subscribe({
      next: _ => this.router.navigate(["/courses"]), 
      error: showError})
  }

  openSnackBar(message: string) {
    if (!this.errors) {
      this._snackBar.open(message);
      this._snackBar._openedSnackBarRef?._dismissAfter(5000);
    }  
  }
}