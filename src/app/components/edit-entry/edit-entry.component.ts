import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { DictionaryService } from '../../services/dictionary.service';
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
        <br>
        <input
          type="text"
          [(ngModel)]="entry.definition"
          name="definition"
          class="main-entry"
          placeholder="definition"
          autocomplete="off"
        >
        <br>
        <input
          type="text"
          [(ngModel)]="newTags"
          name="newTags"
          class="main-entry"
          placeholder="add tags..."
          autocomplete="off"
        >
        <div class="tag-container">
          <div *ngFor="let tag of entry.tags" class="tag-display">
            {{ tag }} <a (click)="removeTag(tag)">X</a>
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
  definition;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private dictionaryService: DictionaryService,
    private location: Location
  ) { }

  ngOnInit() {
    const routeText = this.route.snapshot.paramMap.get('text');
    this.entry = this.dataService.getEntry(routeText);
    if (!this.entry) {
      this.entry = { text: routeText, definition: '', tags: []};
    }

    this.dictionaryService.getDefinition(this.entry.text).subscribe(res => {
      this.definition = res;
      // console.log('definition of test: ', this.definition);
    })
  }

  onSubmit(): void {
    console.log('submit!');

    this.dataService.addOrUpdateEntry({
      text: this.entry.text,
      definition: this.entry.definition,
      tags: this.entry.tags
    }, this.newTags);

    this.router.navigate(['/detail',this.entry.text]);
  }

  // for some reason this saves the entry also!
  //
  //   <button
  //   type="button"
  //   class="submit-button"
  //   (click)="cancel()"
  //   >Cancel</button>

  // cancel(): void {
  //   console.log('cancel!');
  //   this.router.navigate(['/detail',this.entry.text]);
  // }

  removeTag(tag): void {
    // console.log('tag2remove: ', tag);
    const index = this.entry.tags.findIndex(r => r === tag);
    // console.log('index: ',index);
    this.entry.tags.splice(index, 1);
  }

}
