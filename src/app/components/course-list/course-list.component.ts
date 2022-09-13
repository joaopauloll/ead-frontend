import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'
import { Course } from 'src/app/models/course.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courseSubscription: any;
  deleted = false;

  constructor(
    public router: Router, 
    private courseService: CourseService, 
    private authService: AuthService,
    private _snackBar: MatSnackBar, ) { }

  courses!: Array<Course>;
  course!: Course;
  my_courses!: Array<Course>;
  mycourse!: Course;
  userLoggedIn: User = this.authService.userValue.user

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({ 
      next: courses => (this.courses = courses),
      error: error => console.log(error)});
  }

  openConfirmationWindow(title: string, id: number) {
    if(confirm("Tem certeza que quer deletar "+ title + "?")) {
      this.courseService.delete(id).subscribe(() => (
        this.deleted = true,
        this.ngOnInit(),
        this.openSnackBar("Curso deletado com sucesso!")
      ));
    }
  }

  openSnackBar(message: string) {
    if (this.deleted) {
      this._snackBar.open(message);
      this._snackBar._openedSnackBarRef?._dismissAfter(5000);
    }  
  }

}
