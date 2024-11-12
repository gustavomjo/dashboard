import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugIAComponent } from './debug-ia.component';

describe('DebugIAComponent', () => {
  let component: DebugIAComponent;
  let fixture: ComponentFixture<DebugIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebugIAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebugIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
