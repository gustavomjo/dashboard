import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListPendenteComponent } from './card-list-pendente.component';

describe('CardListPendenteComponent', () => {
  let component: CardListPendenteComponent;
  let fixture: ComponentFixture<CardListPendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardListPendenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardListPendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
