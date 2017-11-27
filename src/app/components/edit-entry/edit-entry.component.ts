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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private utilities: UtilitiesService,
    private dictionaryService: DictionaryService,
    private location: Location
  ) { }

  ngOnInit() {
    let routeText = this.route.snapshot.paramMap.get('text');
    routeText = this.utilities.decodeUrl(routeText);
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

    this.dataService.addOrUpdateEntry({
      text: this.entry.text,
      definition: this.entry.definition,
      tags: this.entry.tags
    }, this.newTags);

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

  removeTag(tag): void {
    const index = this.entry.tags.findIndex(r => r === tag);
    this.entry.tags.splice(index, 1);
  }

}
