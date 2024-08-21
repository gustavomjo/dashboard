import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFatTotalAnoComponent } from './card-fat-total-ano.component';

describe('CardFatTotalAnoComponent', () => {
  let component: CardFatTotalAnoComponent;
  let fixture: ComponentFixture<CardFatTotalAnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFatTotalAnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardFatTotalAnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
