import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPrazoMedRecebMesComponent } from './card-prazo-med-receb-mes.component';

describe('CardPrazoMedRecebMesComponent', () => {
  let component: CardPrazoMedRecebMesComponent;
  let fixture: ComponentFixture<CardPrazoMedRecebMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPrazoMedRecebMesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPrazoMedRecebMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
