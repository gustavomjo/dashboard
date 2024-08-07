import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCompDespesasComponent } from './card-comp-despesas.component';

describe('CardCompDespesasComponent', () => {
  let component: CardCompDespesasComponent;
  let fixture: ComponentFixture<CardCompDespesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCompDespesasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCompDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
