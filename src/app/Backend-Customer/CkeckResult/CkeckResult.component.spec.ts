/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CkeckResultComponent } from './CkeckResult.component';

describe('CkeckResultComponent', () => {
  let component: CkeckResultComponent;
  let fixture: ComponentFixture<CkeckResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkeckResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeckResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
