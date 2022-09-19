import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Lesson } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }

  create(lesson: Lesson, idCourse: number) {
    return this.http.post(environment.apiUrl + "/api/courses/" + idCourse + "/lessons", lesson);
  }

  getLessons() {
    return this.http.get<any[]>(environment.apiUrl + "/api/courses/lessons");
  }

  getById(id: number) {
    return this.http.get<Lesson>(environment.apiUrl + "/api/courses/lessons/" + id);
  }

  update(lesson: Lesson) {
    return this.http.put(environment.apiUrl + "/api/courses/lessons/" + lesson.id, lesson);
  };

  delete(id: any) {
    return this.http.delete(environment.apiUrl + "/api/courses/lessons/" + id);
  };

}
