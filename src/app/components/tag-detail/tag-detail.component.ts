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
  tags: string[];
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
    let urlString = this.route.snapshot.paramMap.get('tag');
    urlString = this.utilities.decodeUrl(urlString);
    this.tags = urlString.split('.');
    console.log('typeof: ', typeof this.tags);
    this.entries = this.dataService.getEntriesByTags(this.tags);

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

    this.entries = this.dataService.getEntriesByTags(this.tags);
  }

}
