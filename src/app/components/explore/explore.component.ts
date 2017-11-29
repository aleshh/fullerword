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
    scroll(0, 70);
  }

  changeSort(event): void {
    this.sortBy = event.target.id;
    switch (this.sortBy) {
      case ('newest'):
        this.entries.sort((a:Entry, b:Entry) => {
          if (a.dateAdded <  b.dateAdded) return 1;
          if (a.dateAdded == b.dateAdded) return 0;
          if (a.dateAdded >  b.dateAdded) return -1;
        });
        break;
      case ('oldest'):
        this.entries.sort((a:Entry, b:Entry) => {
          if (a.dateAdded >  b.dateAdded) return 1;
          if (a.dateAdded == b.dateAdded) return 0;
          if (a.dateAdded <  b.dateAdded) return -1;
        });
        break;
      case ('alpha'):
        this.entries.sort((a:Entry, b:Entry) => {
          if (a.text >  b.text) return 1;
          if (a.text == b.text) return 0;
          if (a.text <  b.text) return -1;
        });
        break;
    }
  }

}
