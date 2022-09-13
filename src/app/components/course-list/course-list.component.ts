import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courseSubscription: any;

  constructor(public router: Router, private courseService: CourseService) { }

  // courses!: Array<Course>;
  course!: Course;
  courses = ["Curso Angular", "Curso ASP.NET Core", "Curso React"];
  my_courses = ["Curso Angular", "Curso ASP.NET Core", "Curso React"];

  Create(): void {
    this.courseService.create(this.course).subscribe()
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({ 
      next: courses => (this.courses = courses),
      error: error => console.log(error)});
  }

}
