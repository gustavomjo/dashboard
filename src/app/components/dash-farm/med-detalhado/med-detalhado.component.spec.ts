import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedDetalhadoComponent } from './med-detalhado.component';

describe('MedDetalhadoComponent', () => {
  let component: MedDetalhadoComponent;
  let fixture: ComponentFixture<MedDetalhadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedDetalhadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedDetalhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
