/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Project2022Component } from './Project2022.component';

describe('Project2022Component', () => {
  let component: Project2022Component;
  let fixture: ComponentFixture<Project2022Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Project2022Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Project2022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
