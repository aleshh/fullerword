import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { DataService } from '../../services/data.service';
import { UtilitiesService } from '../../services/utilities.service';
import { DictionaryService } from '../../services/dictionary.service';
import { Entry } from '../../models/Entry';
import { DictionaryEntry } from '../../models/DictionaryEntry';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html'
})
export class EditEntryComponent implements OnInit {
  entry: Entry;
  newTags: string;
  definition: DictionaryEntry;
  dictionaryDefinition: string;
  editingExisting: boolean = false;
  useStarRating: boolean;
  useSource: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private utilities: UtilitiesService,
    private dictionaryService: DictionaryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.useStarRating = this.dataService.getPreference('useStarRating');
    this.useSource = this.dataService.getPreference('useSource');
    let routeText = this.route.snapshot.paramMap.get('text');
    routeText = this.utilities.decodeUrl(routeText);
    let loadedEntry = this.dataService.getEntry(routeText);

    if (loadedEntry) {
      // taking a round-trip through the json parser
      // so we're not dealing with the original entry
      // and we can cancel and discard our changes
      const tmp = JSON.stringify(loadedEntry);
      this.entry = JSON.parse(tmp);
      this.entry.dateAdded = new Date(this.entry.dateAdded);

      this.editingExisting = true;
    } else {
      this.entry = { text: routeText, definition: '', tags: []};
    }

    this.dictionaryService.getDefinition(this.entry.text).subscribe(res => {
        this.definition = res;
        this.dictionaryDefinition = this.definition.results[0].lexicalEntries[0]
          .entries[0].senses[0].definitions[0];

        for (let lexicalEntry of this.definition.results[0].lexicalEntries) {
          for (let entry of lexicalEntry.entries) {
            for (let sense of entry.senses) {
              // console.log('lexicalEntry.lexicalCategory: ', lexicalEntry.lexicalCategory);
              console.log('definition: ', sense.definitions[0], ' (',lexicalEntry.lexicalCategory,')' );
            }
          }
        }
      },
      (error: HttpErrorResponse ) => {
        if (error instanceof Error) {
          console.log('client-side error: ', error.error.mesage);
        } else {
          console.log('API error: ', error.status);
          this.dictionaryDefinition = error.status + " error";
        }
      });
  }

  onSubmit(): void {

    this.dataService.addOrUpdateEntry(this.entry, this.newTags);

    this.router.navigate(
      ['/detail', this.utilities.encodeUrl(this.entry.text)]
    );
  }

  cancel(): void {
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

  toggleStar():void {
    if (!this.entry.star) {
      this.entry.star = true;
    } else {
      this.entry.star = false;
    }
  }

  removeTag(tag): void {
    const index = this.entry.tags.findIndex(r => r === tag);
    this.entry.tags.splice(index, 1);
  }

}
