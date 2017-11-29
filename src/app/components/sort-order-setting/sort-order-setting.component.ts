import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort-order-setting',
  templateUrl: './sort-order-setting.component.html'
})
export class SortOrderSettingComponent implements OnInit {
  @Output() sortOrderChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  changeSort(event): void {
    this.sortOrderChanged.emit(event.target.id);
  }
}