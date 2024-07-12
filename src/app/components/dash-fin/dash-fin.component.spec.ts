import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashFinComponent } from './dash-fin.component';

describe('DashFinComponent', () => {
  let component: DashFinComponent;
  let fixture: ComponentFixture<DashFinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashFinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
