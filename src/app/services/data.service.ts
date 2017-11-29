import { Injectable } from '@angular/core';

import { Entry } from '../models/Entry';
import { sampleWords } from './sample-words';

class Preferences {
  tagEntrySeparator: string;
  sampleDataLoaded: boolean;
}

@Injectable()
export class DataService {
  entries: Entry[];
  preferences: Preferences;

  constructor(){
    this.loadEntriesFromLocalStorage();
    this.loadPreferencesFromLocalStorage();
    console.log('prefs: ', this.preferences );
  }

  private loadEntriesFromLocalStorage(): void {
    var loadedEntries = JSON.parse(localStorage.getItem('entries'),
      (key, value) => {
        if ( key == 'dateAdded' ||
             key == 'dateAccessed' ||
             key == 'dateModified') {
          value = new Date(value);
        }
        return value;
      });
    if (loadedEntries !== undefined) {
      this.entries = loadedEntries;
    }
  }

    private saveEntriesToLocalStorage(): void {
      localStorage.setItem('entries', JSON.stringify(this.entries));
    }

  private loadPreferencesFromLocalStorage(): void {
    this.preferences = JSON.parse(localStorage.getItem('preferences'));
    if (this.preferences == undefined) {
      this.preferences = {
        tagEntrySeparator: ',',
        sampleDataLoaded: false
      };
    }
  }

  private savePreferencesToLocalStorage(): void {
    localStorage.setItem('preferences', JSON.stringify(this.preferences));
    this.savePreferencesToLocalStorage();
  }

  setPreference(preference: string, setting: any): void {
    this.preferences[preference] = setting;
  }

  getPreference(preference: string): any {
    return this.preferences[preference];
  }

  getEntries(partialText?: string): Entry[] {
    if (partialText == undefined || partialText == '' ) {
      return this.entries;
    } else {
      let matches = [];
      let length = partialText.length;
      for (let entry of this.entries) {
        if (entry.text.substr(0, length) === partialText) {
          matches.push(entry);
        }
      }
      return matches;
    }
  }

  getEntry(text): Entry {
    let result = this.entries.find(r => r.text === text);
    if (result) result.dateAccessed = new Date();
    return result;
  }

  getEntriesByTag(tag): Entry[] {
    let matches = [];
    for (let entry of this.entries) {
      if (entry.tags.indexOf(tag) != -1) {
        matches.push(entry);
      }
    }
    return matches;
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
        newEntry.dateAdded = new Date();
        newEntry.dateAccessed = new Date();
        newEntry.dateModified = new Date();
        this.entries.unshift(newEntry);
      } else {
        const entryChanged = !this.entriesMatch(this.entries[index], newEntry);
        if (entryChanged) {
          console.log('entry changed: ', newEntry.text);
          newEntry.dateAccessed = new Date();
          newEntry.dateModified = new Date();
          this.entries.splice(index, 1, newEntry)
        }
      }
      this.saveEntriesToLocalStorage();
    }
  }

  deleteEntry(entryToDelete: Entry): void {
    let index = this.entries.findIndex(r => r.text === entryToDelete.text);
    this.entries.splice(index, 1);
    this.saveEntriesToLocalStorage();
  }

  // this is fine for small data sets, but could use major refactoring
  // like, there might should be a separate list of tags?
  getTagList(searchText?: string): object[] {
    let tagSet = [];

    for (let i of this.entries) {
      for (let j of i.tags) {
        let current = tagSet.find(t => t.tag == j);
        if(current) {
          current.count ++;
        } else {
          tagSet.push({tag: j, count: 1});
        }
      }
    }

    if (searchText) {
      let length = searchText.length;
      tagSet = tagSet.filter(i => i.tag.substring(0,length) == searchText);
    }

    return tagSet;
  }

  loadSampleData(): void {
    if (this.preferences.sampleDataLoaded) {
      console.error('Preferences already loaded');
      return;
    }
    let data = sampleWords;
    for (let word of data) {
      word.dateAdded = new Date();
      if (this.entries.indexOf(word) == -1) {
        this.entries.push(word);
      }
    }
  }

  removeSampleData(): void {
    this.entries = this.entries.filter(e => e.sampleData);
  }

  private convertTagStringToTags(tagString: string): string[] {
    const newTags: string[] = tagString.split(this.preferences.tagEntrySeparator);
    const newTagsTrimmed = newTags.map(x => x.trim());
    let newTagsNoBlanks = [];
    for (let tag of newTagsTrimmed) {
      if (tag !== "") newTagsNoBlanks.push(tag);
    }
    return newTagsNoBlanks;
  }

  private entriesMatch(entry1: Entry, entry2: Entry): boolean {
    const entry1Parsed:string = JSON.stringify(entry1);
    const entry2Parsed:string = JSON.stringify(entry2);
    return entry1Parsed === entry2Parsed;
  }

}