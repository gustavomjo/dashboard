import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashReceitasComponent } from './dash-receitas.component';

describe('DashReceitasComponent', () => {
  let component: DashReceitasComponent;
  let fixture: ComponentFixture<DashReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashReceitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
