import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationSentComponent } from './validation-sent.component';

describe('ValidationSentComponent', () => {
  let component: ValidationSentComponent;
  let fixture: ComponentFixture<ValidationSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationSentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidationSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
