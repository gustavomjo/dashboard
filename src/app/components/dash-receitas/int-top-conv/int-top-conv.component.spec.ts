import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntTopConvComponent } from './int-top-conv.component';

describe('IntTopConvComponent', () => {
  let component: IntTopConvComponent;
  let fixture: ComponentFixture<IntTopConvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntTopConvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntTopConvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
