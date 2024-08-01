import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrodataComponent } from './filtrodata.component';

describe('FiltrodataComponent', () => {
  let component: FiltrodataComponent;
  let fixture: ComponentFixture<FiltrodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrodataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltrodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
