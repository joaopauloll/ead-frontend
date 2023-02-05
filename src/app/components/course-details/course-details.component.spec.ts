import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CourseDetailsComponent } from './course-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { userResponse } from 'src/app/models/user-response.model';
import { AuthService } from 'src/app/services/auth.service';
import { MyFilterPipe } from '../../helpers/my-filter.pipe';

class MockAuthService {
  userResponse: userResponse = undefined || {user: {id: -1, name: "joão", email: "", username: "", password: "", role: -1}, token: ""};
  public get userValue(): userResponse {
    return this.userResponse;
  }
}

describe('CourseDetailsComponent', () => {
  let component: CourseDetailsComponent;
  let fixture: ComponentFixture<CourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule
      ],
      declarations: [ CourseDetailsComponent, MyFilterPipe ],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
