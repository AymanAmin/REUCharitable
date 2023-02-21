import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedyfamiliesfileComponent } from './needyfamiliesfile.component';

describe('NeedyfamiliesfileComponent', () => {
  let component: NeedyfamiliesfileComponent;
  let fixture: ComponentFixture<NeedyfamiliesfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeedyfamiliesfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedyfamiliesfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
