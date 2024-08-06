import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBalanceteComponent } from './card-balancete.component';

describe('CardBalanceteComponent', () => {
  let component: CardBalanceteComponent;
  let fixture: ComponentFixture<CardBalanceteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBalanceteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardBalanceteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
