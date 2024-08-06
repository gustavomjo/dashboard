import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvaABCComponent } from './curva-abc.component';

describe('CurvaABCComponent', () => {
  let component: CurvaABCComponent;
  let fixture: ComponentFixture<CurvaABCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurvaABCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurvaABCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
