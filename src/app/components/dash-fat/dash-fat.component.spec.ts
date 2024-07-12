import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashFatComponent } from './dash-fat.component';

describe('DashFatComponent', () => {
  let component: DashFatComponent;
  let fixture: ComponentFixture<DashFatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashFatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashFatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
