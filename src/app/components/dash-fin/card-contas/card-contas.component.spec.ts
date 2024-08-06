import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContasComponent } from './card-contas.component';

describe('CardContasComponent', () => {
  let component: CardContasComponent;
  let fixture: ComponentFixture<CardContasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardContasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
