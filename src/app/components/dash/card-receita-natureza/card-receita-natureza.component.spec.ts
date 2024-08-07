import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReceitaNaturezaComponent } from './card-receita-natureza.component';

describe('CardReceitaNaturezaComponent', () => {
  let component: CardReceitaNaturezaComponent;
  let fixture: ComponentFixture<CardReceitaNaturezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardReceitaNaturezaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardReceitaNaturezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
