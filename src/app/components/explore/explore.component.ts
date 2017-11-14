import { Component, OnInit, Injectable } from '@angular/core';

import { DataService } from '../../services/data.service';
import { Entry } from '../../models/Entry';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html'
})
export class ExploreComponent implements OnInit {
  entries: Entry[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.entries = this.dataService.getEntries();    
  }

}
