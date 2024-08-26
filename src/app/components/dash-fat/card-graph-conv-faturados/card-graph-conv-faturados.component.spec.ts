import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGraphConvFaturadosComponent } from './card-graph-conv-faturados.component';

describe('CardGraphConvFaturadosComponent', () => {
  let component: CardGraphConvFaturadosComponent;
  let fixture: ComponentFixture<CardGraphConvFaturadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGraphConvFaturadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardGraphConvFaturadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
