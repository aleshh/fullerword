import { Component, OnInit, AfterViewInit, Injectable } from '@angular/core';

import { DataService } from '../../services/data.service';
import { UtilitiesService } from '../../services/utilities.service';
import { Entry } from '../../models/Entry';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html'
})
export class ExploreComponent implements OnInit, AfterViewInit {
  entries: Entry[];
  sortBy: string = 'newest';

  constructor(
    private dataService: DataService,
    private utilities: UtilitiesService
  ) { }

  ngOnInit() {
    this.entries = this.dataService.getEntries();
    // this.sortBy = this.dataService.getPreference('sortWordListBy');
    this.changeSort(this.dataService.getPreference('sortWordListBy'));
    console.log('onInit: ', this.sortBy );
    scroll(0, 70);
  }

  ngAfterViewInit() {
    // this.changeSort(this.sortBy);

  }

  changeSort(event): void {
    console.log('event typeof: ', typeof(event) );
    console.log('event: ', event );
    this.sortBy = event;
    this.dataService.setPreference('sortWordListBy', event);
    switch (this.sortBy) {
      case ('newest'):
      console.log('sorting newest' );
      this.entries.sort((a:Entry, b:Entry) => {
          if (a.dateAdded <  b.dateAdded) return 1;
          if (a.dateAdded == b.dateAdded) return 0;
          if (a.dateAdded >  b.dateAdded) return -1;
        });
        break;
      case ('oldest'):
      console.log('sorting oldest ' );
      this.entries.sort((a:Entry, b:Entry) => {
          if (a.dateAdded >  b.dateAdded) return 1;
          if (a.dateAdded == b.dateAdded) return 0;
          if (a.dateAdded <  b.dateAdded) return -1;
        });
        break;
      case ('alpha'):
      console.log('sorting alpha: ' );
        this.entries.sort((a:Entry, b:Entry) => {
          if (a.text >  b.text) return 1;
          if (a.text == b.text) return 0;
          if (a.text <  b.text) return -1;
        });
        break;
    }
  }

}
