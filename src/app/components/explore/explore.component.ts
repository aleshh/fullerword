import { Component, OnInit, Injectable } from '@angular/core';

import { DataService } from '../../services/data.service';
import { UtilitiesService } from '../../services/utilities.service';
import { Entry } from '../../models/Entry';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html'
})
export class ExploreComponent implements OnInit {
  entries: Entry[];
  sortBy: string;

  constructor(
    private dataService: DataService,
    private utilities: UtilitiesService
  ) { }

  ngOnInit() {
    this.entries = this.dataService.getEntries();
    // scroll(0, 70);
  }

  changeSort(event): void {
    this.sortBy = event.target.id;
  }

}
