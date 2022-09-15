import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Lesson } from 'src/app/models/lesson.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { LessonService } from 'src/app/services/lesson.service';

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
  panelOpenState = false;

  constructor(
    private lessonService: LessonService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private authService: AuthService,
    public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.courseId = params['courseId']
    });
    this.courseService.getById(this.courseId).subscribe({ 
      next: course => (
        this.course = course,
        console.log(this.course),
        this.lessons = this.course.lessons,
        console.log(this.lessons),
        this.lessons.forEach(lesson => lesson.linkSafe = this.sanitizer.bypassSecurityTrustResourceUrl(lesson.link)),
        this.students = this.course.students),
      error: error => console.log(error)
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
