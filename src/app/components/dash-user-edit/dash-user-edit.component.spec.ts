import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashUserEditComponent } from './dash-user-edit.component';

describe('DashUserEditComponent', () => {
  let component: DashUserEditComponent;
  let fixture: ComponentFixture<DashUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashUserEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
