/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SupportNeedyFamilies_RpComponent } from './SupportNeedyFamilies_Rp.component';

describe('SupportNeedyFamilies_RpComponent', () => {
  let component: SupportNeedyFamilies_RpComponent;
  let fixture: ComponentFixture<SupportNeedyFamilies_RpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportNeedyFamilies_RpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportNeedyFamilies_RpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
