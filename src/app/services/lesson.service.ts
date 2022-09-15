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
    return this.http.post(environment.apiUrl + "/api/course/" + idCourse + "/lesson", lesson);
  }

  getLessons() {
    return this.http.get<any[]>(environment.apiUrl + "/api/course/lessons");
  }

  getById(id: number) {
    return this.http.get<Lesson>(environment.apiUrl + "/api/course/lessons/" + id);
  }

  update(lesson: Lesson) {
    return this.http.put(environment.apiUrl + "/api/course/lessons/" + lesson.id, lesson);
  };

  delete(id: any) {
    return this.http.delete(environment.apiUrl + "/api/course/lessons/" + id);
  };

}
