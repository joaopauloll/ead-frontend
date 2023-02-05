import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonFormComponent } from './lesson-form.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('LessonFormComponent', () => {
  let component: LessonFormComponent;
  let fixture: ComponentFixture<LessonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule
      ],
      declarations: [ LessonFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
