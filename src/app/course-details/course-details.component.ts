import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  constructor() { }

  lessons = [1, 2, 3, 4, 5, 6];

  ngOnInit(): void {
  }

}
