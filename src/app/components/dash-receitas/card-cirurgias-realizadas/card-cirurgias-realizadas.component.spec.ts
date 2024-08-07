import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCirurgiasRealizadasComponent } from './card-cirurgias-realizadas.component';

describe('CardCirurgiasRealizadasComponent', () => {
  let component: CardCirurgiasRealizadasComponent;
  let fixture: ComponentFixture<CardCirurgiasRealizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCirurgiasRealizadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCirurgiasRealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
