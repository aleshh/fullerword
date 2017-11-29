import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortOrderSettingComponent } from './sort-order-setting.component';

describe('SortOrderSettingComponent', () => {
  let component: SortOrderSettingComponent;
  let fixture: ComponentFixture<SortOrderSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortOrderSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortOrderSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
