import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntryComponent } from './edit-entry.component';

describe('EditEntryComponent', () => {
  let component: EditEntryComponent;
  let fixture: ComponentFixture<EditEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
