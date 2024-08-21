import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFatTotalSituacaoComponent } from './card-fat-total-situacao.component';

describe('CardFatTotalSituacaoComponent', () => {
  let component: CardFatTotalSituacaoComponent;
  let fixture: ComponentFixture<CardFatTotalSituacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFatTotalSituacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardFatTotalSituacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
