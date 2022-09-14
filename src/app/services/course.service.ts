import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from "../../environments/environment";
import { Course } from '../models/course.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  create(course: Course) {
    return this.http.post(environment.apiUrl + "/api/courses", course);
  }

  getCourses() {
    return this.http.get<any[]>(environment.apiUrl + "/api/courses");
  }

  getById(id: number) {
    return this.http.get<Course>(environment.apiUrl + "/api/courses/" + id);
  }

  update(course: Course) {
    return this.http.put(environment.apiUrl + "/api/courses/" + course.id, course);
  };

  delete(id: any) {
    return this.http.delete(environment.apiUrl + "/api/courses/" + id);
  };

  subscribeCourse(idCourse: number) {
    return this.http.put(environment.apiUrl + "/api/courses/" + idCourse + "/students", null);
  };

  unsubscribeCourse(idCourse: number, idStudent: number) {
    return this.http.put(environment.apiUrl + "/api/courses/" + idCourse + "/students/" + idStudent, null);
  };
}
