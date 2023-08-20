/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Governance2022Component } from './governance2022.component';

describe('Governance2022Component', () => {
  let component: Governance2022Component;
  let fixture: ComponentFixture<Governance2022Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Governance2022Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Governance2022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
