import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserListComponent } from './principal/user-list/user-list.component';
import { LogListComponent } from './principal/log-list/log-list.component';
import { AuthGuard } from './helpers/auth.guard';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { LessonFormComponent } from './components/lesson-form/lesson-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'my-courses', component: CourseListComponent, canActivate: [AuthGuard] },
  { path: 'courses/:courseId', component: CourseDetailsComponent },
  { path: 'courses/edit/:courseId', component: CourseFormComponent },
  { path: 'create-course', component: CourseFormComponent },
  { path: 'courses/:courseId/lessons/:lessonId', component: LessonFormComponent },
  { path: 'courses/:courseId/create-lesson', component: LessonFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit/:id', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'logs', component: LogListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
