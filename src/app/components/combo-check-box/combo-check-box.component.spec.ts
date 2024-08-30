import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboCheckBoxComponent } from './combo-check-box.component';

describe('ComboCheckBoxComponent', () => {
  let component: ComboCheckBoxComponent;
  let fixture: ComponentFixture<ComboCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboCheckBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComboCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
