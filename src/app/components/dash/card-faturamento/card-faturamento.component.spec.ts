import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFaturamentoComponent } from './card-faturamento.component';

describe('CardFaturamentoComponent', () => {
  let component: CardFaturamentoComponent;
  let fixture: ComponentFixture<CardFaturamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFaturamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardFaturamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
