/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IZOCertificateComponent } from './IZO-certificate.component';

describe('IZOCertificateComponent', () => {
  let component: IZOCertificateComponent;
  let fixture: ComponentFixture<IZOCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IZOCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IZOCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
