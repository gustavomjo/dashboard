import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsTopConvComponent } from './cons-top-conv.component';

describe('ConsTopConvComponent', () => {
  let component: ConsTopConvComponent;
  let fixture: ComponentFixture<ConsTopConvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsTopConvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsTopConvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
