import { Injectable } from '@angular/core';
import { Entry } from '../models/Entry';

@Injectable()
export class DataService {
  entries: Entry[];
  preferences;

  constructor(){

    this.entries = [];

    // this.entries = [
    //   {
    //     text: 'consonant',
    //     definition: 'in agreement or harmony',
    //     tags: [ 'adjective', 'positive', 'relational' ]
    //   },
    //   { text: 'desultory', definition: '', tags: [] },
    //   { text: 'insouciant', definition: '', tags: [] },
    //   { text: 'claptrap', definition: '', tags: [] },
    //   { text: 'Discrete bilateral channel', definition: '', tags: [] },
    //   { text: 'contumaciously', definition: '', tags: [] },
    //   { text: 'elan', definition: '', tags: [] },
    //   { text: 'Stuzzi botz', definition: '', tags: [] },
    //   { text: 'invective', definition: '', tags: [] },
    //   { text: 'altacocker', definition: '', tags: [] },
    //   { text: 'mordant', definition: '', tags: [] },
    //   { text: 'apres nous, le deluge!', definition: '', tags: [] },
    //   { text: 'quixotic', definition: '', tags: [] },
    //   { text: 'ignominious', definition: '', tags: [] },
    //   { text: 'paroxysm', definition: '', tags: [] }
    // ];

    this.preferences = {
      tagEntrySeparator: ','
    };

    this.loadEntriesFromLocalStorage();
  }

  loadEntriesFromLocalStorage(): void {
    var loadedEntries = JSON.parse(localStorage.getItem('entries'));
    if (loadedEntries !== undefined) {
      this.entries = loadedEntries;
    }
  }

  saveEntriesToLocalStorage(): void {
    localStorage.setItem('entries', JSON.stringify(this.entries));
  }

  getEntries(): Entry[] {
    return this.entries;
  }

  getEntry(text): Entry {
    let result = this.entries.find(r => r.text === text);
    return result;
  }

  addOrUpdateEntry(newEntry: Entry, tagString?: string): void {
    if (newEntry.text && newEntry.text !== '') {
      if (tagString) {
        let newTags = this.convertTagStringToTags(tagString);
        for (let tag of newTags) {
          if (newEntry.tags.indexOf(tag) == -1) {

            newEntry.tags.push(tag);
          }
        }
      }
      let index = this.entries.findIndex(r => r.text === newEntry.text);
      if (index == -1) {
        // console.log('DataService adding new entry: ', newEntry);
        this.entries.unshift(newEntry);
      } else {
        // console.log('DataService upating entry: ', newEntry);
        this.entries.splice(index, 1, newEntry)
      }
      this.saveEntriesToLocalStorage();
    }
  }

  deleteEntry(entryToDelete: Entry): void {
    let index = this.entries.findIndex(r => r.text === entryToDelete.text);
    this.entries.splice(index, 1)
  }

  convertTagStringToTags(tagString: string): string[] {
    let newTags: string[] = tagString.split(this.preferences.tagEntrySeparator);
    let newTagsTrimmed = newTags.map(x => x.trim());
    return newTagsTrimmed;
  }

}