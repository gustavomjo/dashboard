import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLeitosComponent } from './card-leitos.component';

describe('CardLeitosComponent', () => {
  let component: CardLeitosComponent;
  let fixture: ComponentFixture<CardLeitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLeitosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardLeitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
