import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Lesson } from 'src/app/models/lesson.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  lessons!: Array<Lesson>;
  lesson!: Lesson;
  course!: Course;
  courseId!: number;
  routeSub!: Subscription;
  userLoggedIn: User = this.authService.userValue.user
  students!: Array<User>;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.courseId = params['courseId']
    });
    this.courseService.getById(this.courseId).subscribe({ 
      next: course => (
        this.course = course,
        console.log(this.course),
        this.lessons = this.course.lessons,
        this.students = this.course.students),
      error: error => console.log(error)});
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
