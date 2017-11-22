import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { DictionaryService } from '../../services/dictionary.service';
import { Entry } from '../../models/Entry';
import { DictionaryEntry } from '../../models/DictionaryEntry';

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
        <button
          type="button"
          class="submit-button"
          (click)="cancel()"
        >Cancel</button>
        <button
          type="button"
          class="submit-button"
          (click)="delete()"
        >Delete</button>

      </form>
      <div *ngIf="dictionaryDefinition">
        <button (click)="useDefinition()" >Use</button>
        {{ dictionaryDefinition }}
      </div>
    </div>
  `
  // templateUrl: './edit-entry.component.html'
})
export class EditEntryComponent implements OnInit {
  entry: Entry;
  newTags: string;
  definition: DictionaryEntry;
  dictionaryDefinition: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private dictionaryService: DictionaryService,
    private location: Location
  ) { }

  ngOnInit() {
    const routeText = this.route.snapshot.paramMap.get('text');
    let loadedEntry = this.dataService.getEntry(routeText);

    if (loadedEntry) {
      // making a copy of the object (not reference)
      // so we can cancel the edit.
      // slice() copies the array of tags.
      this.entry = {
        text: loadedEntry.text,
        definition: loadedEntry.definition,
        tags: loadedEntry.tags.slice()
      };
    } else {
      this.entry = { text: routeText, definition: '', tags: []};
    }

    this.dictionaryService.getDefinition(this.entry.text).subscribe(res => {
      this.definition = res;
      this.dictionaryDefinition = this.definition.results[0].lexicalEntries[0]
        .entries[0].senses[0].definitions[0];
      // console.log('definition of "', this.entry.text, '": ',
      //   this.dictionaryDefinition);
    });
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

  cancel(): void {
    console.log('cancel!');
    this.location.back()
  }

  delete(): void {
    if (window.confirm('Permanently delete ' + this.entry.text + '?')) {
      this.dataService.deleteEntry(this.entry);
      this.router.navigate(['/explore']);
    }
  }

  useDefinition(): void {
    this.entry.definition = this.dictionaryDefinition;
  }

  removeTag(tag): void {
    const index = this.entry.tags.findIndex(r => r === tag);
    this.entry.tags.splice(index, 1);
  }

}
