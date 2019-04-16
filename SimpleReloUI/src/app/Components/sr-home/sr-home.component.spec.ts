import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrHomeComponent } from './sr-home.component';

describe('SrHomeComponent', () => {
  let component: SrHomeComponent;
  let fixture: ComponentFixture<SrHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
