import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassCompleteComponent } from './change-pass-complete.component';

describe('ChangePassCompleteComponent', () => {
  let component: ChangePassCompleteComponent;
  let fixture: ComponentFixture<ChangePassCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePassCompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePassCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
