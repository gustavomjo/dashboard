import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLeitosDetalhadoComponent } from './card-leitos-detalhado.component';

describe('CardLeitosDetalhadoComponent', () => {
  let component: CardLeitosDetalhadoComponent;
  let fixture: ComponentFixture<CardLeitosDetalhadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLeitosDetalhadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardLeitosDetalhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
