import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesfamiliesComponent } from './servicesfamilies.component';

describe('ServicesfamiliesComponent', () => {
  let component: ServicesfamiliesComponent;
  let fixture: ComponentFixture<ServicesfamiliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesfamiliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesfamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
