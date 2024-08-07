import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPrazoMedRecebAnoComponent } from './card-prazo-med-receb-ano.component';

describe('CardPrazoMedRecebAnoComponent', () => {
  let component: CardPrazoMedRecebAnoComponent;
  let fixture: ComponentFixture<CardPrazoMedRecebAnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPrazoMedRecebAnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPrazoMedRecebAnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
