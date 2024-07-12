import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashFarmComponent } from './dash-farm.component';

describe('DashFarmComponent', () => {
  let component: DashFarmComponent;
  let fixture: ComponentFixture<DashFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashFarmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
