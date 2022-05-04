import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoChooserComponent } from './photo-chooser.component';

describe('PhotoChooserComponent', () => {
  let component: PhotoChooserComponent;
  let fixture: ComponentFixture<PhotoChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
