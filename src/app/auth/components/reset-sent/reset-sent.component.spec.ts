import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSentComponent } from './reset-sent.component';

describe('ResetSentComponent', () => {
  let component: ResetSentComponent;
  let fixture: ComponentFixture<ResetSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetSentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
