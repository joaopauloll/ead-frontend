import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/lesson.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  lessons!: Array<Lesson>;
  lesson!: Lesson;

  constructor() { }

  ngOnInit(): void {
  }

}
