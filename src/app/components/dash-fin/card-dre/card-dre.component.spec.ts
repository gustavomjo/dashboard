import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDreComponent } from './card-dre.component';

describe('CardDreComponent', () => {
  let component: CardDreComponent;
  let fixture: ComponentFixture<CardDreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
