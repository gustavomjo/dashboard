import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFatSitAnoMesComponent } from './card-fat-sit-ano-mes.component';

describe('CardFatSitAnoMesComponent', () => {
  let component: CardFatSitAnoMesComponent;
  let fixture: ComponentFixture<CardFatSitAnoMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFatSitAnoMesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardFatSitAnoMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
