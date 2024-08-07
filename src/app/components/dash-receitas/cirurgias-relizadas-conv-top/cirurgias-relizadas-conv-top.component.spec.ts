import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirurgiasRelizadasConvTopComponent } from './cirurgias-relizadas-conv-top.component';

describe('CirurgiasRelizadasConvTopComponent', () => {
  let component: CirurgiasRelizadasConvTopComponent;
  let fixture: ComponentFixture<CirurgiasRelizadasConvTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirurgiasRelizadasConvTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CirurgiasRelizadasConvTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
