import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorationHomeFormComponent } from './restoration-home-form.component';

describe('RestorationHomeFormComponent', () => {
  let component: RestorationHomeFormComponent;
  let fixture: ComponentFixture<RestorationHomeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestorationHomeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorationHomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
