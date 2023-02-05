import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LessonService } from './lesson.service';

describe('LessonService', () => {
  let service: LessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    service = TestBed.inject(LessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
