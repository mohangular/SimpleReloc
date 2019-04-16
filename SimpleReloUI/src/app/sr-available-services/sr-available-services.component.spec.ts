import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrAvailableServicesComponent } from './sr-available-services.component';

describe('SrAvailableServicesComponent', () => {
  let component: SrAvailableServicesComponent;
  let fixture: ComponentFixture<SrAvailableServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrAvailableServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrAvailableServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
