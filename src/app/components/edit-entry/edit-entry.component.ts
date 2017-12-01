import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
// import { FormsModule } from '@angular/forms';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private utilities: UtilitiesService,
    private dictionaryService: DictionaryService,
    private location: Location
  ) { }

  ngOnInit() {
    let useStarRating = this.dataService.getPreference('useStarRating');
    let routeText = this.route.snapshot.paramMap.get('text');
    routeText = this.utilities.decodeUrl(routeText);
    let loadedEntry = this.dataService.getEntry(routeText);

    if (loadedEntry) {
      // taking a round-trip through the json parser
      // so we're not dealing with the original entry
      // and we can cancel and discard our changes
      const tmp = JSON.stringify(loadedEntry);
      this.entry = JSON.parse(tmp);

      this.editingExisting = true;
    } else {
      this.entry = { text: routeText, definition: '', tags: []};
    }

    this.dictionaryService.getDefinition(this.entry.text).subscribe(res => {
      this.definition = res;
      this.dictionaryDefinition = this.definition.results[0].lexicalEntries[0]
        .entries[0].senses[0].definitions[0];
    });
  }

  onSubmit(): void {

    this.dataService.addOrUpdateEntry(this.entry, this.newTags);

    // don't remember why we were spelling it out this way..
    // this.dataService.addOrUpdateEntry({
    //   text: this.entry.text,
    //   definition: this.entry.definition,
    //   tags: this.entry.tags
    // }, this.newTags);

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
