import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor() { }

  courses = ["Curso Angular", "Curso ASP.NET Core", "Curso React", "Curso table_jim", "Curso testejp2", "Curso DudaGourmet"];

  ngOnInit(): void {
  }

}
