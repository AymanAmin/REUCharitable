/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewRegistrationStep4Component } from './NewRegistration-step4.component';

describe('NewRegistrationStep4Component', () => {
  let component: NewRegistrationStep4Component;
  let fixture: ComponentFixture<NewRegistrationStep4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRegistrationStep4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegistrationStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
