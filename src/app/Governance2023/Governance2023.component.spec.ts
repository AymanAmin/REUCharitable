/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Governance2023Component } from './Governance2023.component';

describe('Governance2023Component', () => {
  let component: Governance2023Component;
  let fixture: ComponentFixture<Governance2023Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Governance2023Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Governance2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
