import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project2023Component } from './project2023.component';

describe('Project2023Component', () => {
  let component: Project2023Component;
  let fixture: ComponentFixture<Project2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Project2023Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Project2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
