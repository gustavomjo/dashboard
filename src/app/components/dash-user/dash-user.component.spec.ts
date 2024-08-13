import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashUserComponent } from './dash-user.component';

describe('DashUserComponent', () => {
  let component: DashUserComponent;
  let fixture: ComponentFixture<DashUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
