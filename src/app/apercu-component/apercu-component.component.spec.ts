import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApercuComponentComponent } from './apercu-component.component';

describe('ApercuComponentComponent', () => {
  let component: ApercuComponentComponent;
  let fixture: ComponentFixture<ApercuComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApercuComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApercuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
