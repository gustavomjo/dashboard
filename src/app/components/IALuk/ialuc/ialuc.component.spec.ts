import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IALucComponent } from './ialuc.component';

describe('IALucComponent', () => {
  let component: IALucComponent;
  let fixture: ComponentFixture<IALucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IALucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IALucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
