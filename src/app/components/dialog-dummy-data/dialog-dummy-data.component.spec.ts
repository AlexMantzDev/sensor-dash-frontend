import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDummyDataComponent } from './dialog-dummy-data.component';

describe('DialogDummyDataComponent', () => {
  let component: DialogDummyDataComponent;
  let fixture: ComponentFixture<DialogDummyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDummyDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDummyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
