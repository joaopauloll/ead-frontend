import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Lesson } from 'src/app/models/lesson.model';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.css']
})
export class LessonFormComponent implements OnInit {

  errors!: any[];
  routeSub!: Subscription;
  lesson!: Lesson;
  lessonId!: number;
  courseId!: number;
  updatedLesson!: Lesson;

  constructor(
    private lessonService: LessonService, 
    public router: Router, 
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    link: new FormControl(''),
    description: new FormControl(''),
  });

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.courseId = params['courseId']
      if (this.router.url != '/courses/' + this.courseId + '/create-lesson') {
        this.lessonId = params['lessonId']
      }
    });
    if (this.router.url != '/courses/' + this.courseId + '/create-lesson') {
      this.lessonService.getById(this.lessonId).subscribe({next: lesson => this.lesson = lesson, error: error => console.log(error)});
    }
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }

    let formLesson: Lesson = this.form.value;

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
    if (this.router.url == '/courses/' + this.courseId + '/create-lesson') {
      this.lessonService.create(formLesson, this.courseId).subscribe({
        next: _ => this.router.navigate(["/courses/" + this.courseId]), 
        error: showError})
    } else {
      this.updatedLesson = formLesson;
      this.updatedLesson.id = this.lessonId;
      this.lessonService.update(this.updatedLesson).subscribe({
        next: _ => this.router.navigate(["/courses/" + this.courseId]), 
        error: showError})
    }
  }

  openSnackBar(message: string) {
    if (!this.errors) {
      this._snackBar.open(message);
      this._snackBar._openedSnackBarRef?._dismissAfter(5000);
    }  
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}