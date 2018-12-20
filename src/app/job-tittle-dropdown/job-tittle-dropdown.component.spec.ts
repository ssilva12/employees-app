import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTittleDropdownComponent } from './job-tittle-dropdown.component';

describe('JobTittleDropdownComponent', () => {
  let component: JobTittleDropdownComponent;
  let fixture: ComponentFixture<JobTittleDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTittleDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTittleDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
