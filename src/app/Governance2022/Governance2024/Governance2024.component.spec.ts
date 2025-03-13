/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Governance2024Component } from './Governance2024.component';

describe('Governance2024Component', () => {
  let component: Governance2024Component;
  let fixture: ComponentFixture<Governance2024Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Governance2024Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Governance2024Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
