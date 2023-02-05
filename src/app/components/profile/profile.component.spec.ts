import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { userResponse } from 'src/app/models/user-response.model';
import { AuthService } from '../../services/auth.service';

class MockAuthService {
  userResponse: userResponse = undefined || {user: {id: -1, name: "joão", email: "", username: "", password: "", role: -1}, token: ""};
  public get userValue(): userResponse {
    return this.userResponse;
  }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule
      ],
      declarations: [ ProfileComponent, NavBarComponent ],
      providers: [
        NavBarComponent,
        {
          provide: AuthService,
          useClass: MockAuthService
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
