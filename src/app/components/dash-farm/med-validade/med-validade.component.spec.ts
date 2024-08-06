import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedValidadeComponent } from './med-validade.component';

describe('MedValidadeComponent', () => {
  let component: MedValidadeComponent;
  let fixture: ComponentFixture<MedValidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedValidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedValidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
