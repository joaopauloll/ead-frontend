import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor(public router: Router) { }

  courses = ["Curso Angular", "Curso ASP.NET Core", "Curso React", "Curso table_jim", "Curso testejp2", "Curso DudaGourmet"];
  my_courses = ["Curso Angular", "Curso ASP.NET Core", "Curso React"];


  ngOnInit(): void {
  }

}
