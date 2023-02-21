import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectivComponent } from './objectiv.component';

describe('ObjectivComponent', () => {
  let component: ObjectivComponent;
  let fixture: ComponentFixture<ObjectivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
