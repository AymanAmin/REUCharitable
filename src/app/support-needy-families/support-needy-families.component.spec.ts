import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportNeedyFamiliesComponent } from './support-needy-families.component';

describe('SupportNeedyFamiliesComponent', () => {
  let component: SupportNeedyFamiliesComponent;
  let fixture: ComponentFixture<SupportNeedyFamiliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportNeedyFamiliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportNeedyFamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
