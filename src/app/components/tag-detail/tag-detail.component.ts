import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { UtilitiesService } from '../../services/utilities.service';
import { Entry } from '../../models/Entry';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html'
})
export class TagDetailComponent implements OnInit {
  tag: string;
  entries: Entry[];
  sortBy: string;
  displaySize: string;
  useStarRating: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private utilities: UtilitiesService
  ) { }

  ngOnInit() {
    this.tag = this.route.snapshot.paramMap.get('tag');
    this.tag = this.utilities.decodeUrl(this.tag);
    this.entries = this.dataService.getEntriesByTag(this.tag);

    this.sortBy = this.dataService.getPreference('sortWordListBy');
    this.displaySize = this.dataService.getPreference('exploreDisplaySize');
    this.useStarRating = this.dataService.getPreference('useStarRating');

    this.utilities.hideWordListPreferences();
  }

  toggleStar(entry: Entry) {
    entry.star = !entry.star;
  }

  changeSort(event): void {
    if (this.sortBy == event) return;

    this.dataService.setPreference('sortWordListBy', event);
    this.sortBy = event;

    this.entries = this.dataService.getEntriesByTag(this.tag);
  }

}
