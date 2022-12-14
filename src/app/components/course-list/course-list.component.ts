import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'
import { Course } from 'src/app/models/course.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courseSubscription: any;
  deleted = false;
  courses!: Array<Course>;
  course!: Course;
  my_courses!: Array<Course>;
  mycourse!: Course;
  userLoggedIn!: User;
  filterValue!: string;

  constructor(
    public router: Router, 
    private courseService: CourseService, 
    private authService: AuthService,
    private userService: UserService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void { 
    const getCourses = (courses: Array<Course>) => {
      this.courses = courses;
      if (this.userLoggedIn.role == 1) {
        this.my_courses = courses.filter(course => course.ownerId == this.userLoggedIn.id)
      }
      if (this.userLoggedIn.role == 2) {
        this.userService.getUserCourses(this.userLoggedIn.id).subscribe({
          next: (userCourses => (
            this.my_courses = userCourses,
            console.log(userCourses))),
          error: error => (console.log(error),
            this.my_courses = [])})
      }
    }
    if (this.authService.userValue) {
      this.userLoggedIn = this.authService.userValue.user
      this.courseService.getCourses().subscribe({ 
        next: getCourses,
        error: error => console.log(error)});
    } else {
      this.userLoggedIn = {id: -1, name: "", email: "", username: "", password: "", role: -1}
      this.courseService.getCourses().subscribe({ 
        next: courses => (this.courses = courses),
        error: error => console.log(error)});
    }
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

  subscribeCourse(idCourse: number) {
    this.courseService.subscribeCourse(idCourse).subscribe({
      next: (() => this.ngOnInit()), 
      error: error => console.log(error)
    });
  }

  unsubscribeCourse(idCourse: number, idStudent: number) {
    this.courseService.unsubscribeCourse(idCourse, idStudent).subscribe({
      next: (() => (this.ngOnInit(),
      console.log("ok"))), 
      error: error => console.log(error)
    });
  }

  isStudent(course: Course) {
    return course.students.some(user => {
      if (user.id == this.userLoggedIn.id) {
        return true;
      }
      return false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();
  }

}
