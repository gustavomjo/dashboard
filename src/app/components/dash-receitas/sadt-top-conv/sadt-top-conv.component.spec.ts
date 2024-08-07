import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SadtTopConvComponent } from './sadt-top-conv.component';

describe('SadtTopConvComponent', () => {
  let component: SadtTopConvComponent;
  let fixture: ComponentFixture<SadtTopConvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SadtTopConvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SadtTopConvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
