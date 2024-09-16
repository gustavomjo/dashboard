import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDreDatailsComponent } from './modal-dre-datails.component';

describe('ModalDreDatailsComponent', () => {
  let component: ModalDreDatailsComponent;
  let fixture: ComponentFixture<ModalDreDatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDreDatailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDreDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
