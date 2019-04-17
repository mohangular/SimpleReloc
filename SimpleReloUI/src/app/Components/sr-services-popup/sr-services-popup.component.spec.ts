import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrServicesPopupComponent } from './sr-services-popup.component';

describe('SrServicesPopupComponent', () => {
  let component: SrServicesPopupComponent;
  let fixture: ComponentFixture<SrServicesPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrServicesPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrServicesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
