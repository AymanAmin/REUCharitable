import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryVidComponent } from './gallery-vid.component';

describe('GalleryVidComponent', () => {
  let component: GalleryVidComponent;
  let fixture: ComponentFixture<GalleryVidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryVidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryVidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
