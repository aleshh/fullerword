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
          [(ngModel)]="entryText" 
          name="entryText"
          class="main-entry" 
        >
        <input 
          type="text" 
          [(ngModel)]="definition" 
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
        <input type="submit" class="submit-button" value="Save">
      </form>
    </div>
  `
  // templateUrl: './edit-entry.component.html'
})
export class EditEntryComponent implements OnInit {
  entryText: string;
  definition: string;
  entry: Entry;
  newTags: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit() {
    this.entryText = this.route.snapshot.paramMap.get('text');
  }

  onSubmit() {
    this.dataService.addOrUpdateEntry({ 
      text: this.entryText, 
      definition: this.definition
    });
    this.router.navigate(['/explore']);
  }

  tagsSubmitted() {
    console.log('tags');
  }

}
