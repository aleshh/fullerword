import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Entry } from '../../models/Entry';

@Component({
  selector: 'app-entry-detail',
  template: `
    <div class="entry-detail-main">
      <h1>{{ entry.text }}</h1>
      <p>{{entry.definition}}</p>
      <div class="tag-container">
        <div *ngFor="let tag of entry.tags" class="tag-display">
          <i-circle></i-circle> {{ tag }}
        </div>
      </div>
      <button (click)="editEntry()"> <i-edit></i-edit> Edit</button>
    </div>
  `
  // templateUrl: './entry-detail.component.html'
})
export class EntryDetailComponent implements OnInit {
  entry: Entry;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getEntry();
  }

  getEntry(): void {
    const routeText = this.route.snapshot.paramMap.get('text');
    this.entry = this.dataService.getEntry(routeText);
  }

  editEntry(): void {
    this.router.navigate(['edit/', this.entry.text]);
  }

}
