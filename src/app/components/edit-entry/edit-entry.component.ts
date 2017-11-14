import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from '../../services/data.service';
import { Entry } from '../../models/Entry';

@Component({
  selector: 'app-edit-entry',
  template: `
    <div class="add-entry-main">
      <form (ngSubmit)="onSubmit()">
        <input
          type="text"
          [(ngModel)]="entry.text"
          name="entryText"
          class="main-entry"
        >
        <input
          type="text"
          [(ngModel)]="entry.definition"
          name="definition"
          class="main-entry"
          placeholder="definition"
          autocomplete="off"
        >
        <input
          type="text"
          [(ngModel)]="newTags"
          name="newTags"
          (keydown.enter)="tagsSubmitted()"
          class="main-entry"
          placeholder="add tags..."
          autocomplete="off"
        >
        <div class="tag-container">
          <div *ngFor="let tag of entry.tags" class="tag-display">
            {{ tag }}
          </div>
        </div>
        <input type="submit" class="submit-button" value="Save">
      </form>
    </div>
  `
  // templateUrl: './edit-entry.component.html'
})
export class EditEntryComponent implements OnInit {
  entry: Entry;
  newTags: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit() {
    const routeText = this.route.snapshot.paramMap.get('text');
    this.entry = this.dataService.getEntry(routeText);
    if (!this.entry) {
      this.entry = { text: routeText, definition: '', tags: []};
    }
  }

  onSubmit() {
    this.dataService.addOrUpdateEntry({
      text: this.entry.text,
      definition: this.entry.definition,
      tags: this.entry.tags
    }, this.newTags);
    this.router.navigate(['/explore']);
  }

  tagsSubmitted() {
    console.log('tags: ', this.newTags);
  }

}
