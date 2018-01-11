import { Injectable } from '@angular/core';

import { Entry } from '../models/Entry';
import { sampleWords } from './sample-words';

// interface Preferences {
//   tagEntrySeparator: string;  // ',' or ' '
//   sampleDataLoaded: boolean;
//   useStarRating: boolean;
//   sortWordListBy: string;     // 'newest', 'oldest', 'alpha'
//   exploreDisplaySize: string; // 'small', 'medium', 'large'
//   useSource: boolean;
// }

@Injectable()
export class DataService {
  entries: Entry[];
  preferences;
  selectedTags: string[]; // temporarily stores tags selected on tags screen

  constructor(){
    this.loadPreferencesFromLocalStorage();
    this.loadEntriesFromLocalStorage();
    this.selectedTags = [];

    // // total reset:
    // localStorage.removeItem('preferences');
    // localStorage.removeItem('entries');
  }

  // # Entries CRUD

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

  // returns entries matching all tags
  getEntriesByTags(tags: string[]): Entry[] {
    let matches: Entry[] = [];
    for (let entry of this.entries) {
      let containsTags = true;
      let index = 0;
      while(containsTags && index < tags.length) {
        if (entry.tags.indexOf(tags[index]) == -1) {
          containsTags = false;
        }
        index ++;
      }
      if (containsTags) {
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
      newEntry.sampleData = false;
      let index = this.entries.findIndex(r => r.text === newEntry.text);
      if (index == -1) {
        newEntry.dateAdded = new Date();
        newEntry.dateAccessed = new Date();
        newEntry.dateModified = new Date();
        this.entries.unshift(newEntry);
        this.sortEntries();
      } else {
        const entryChanged = !this.entriesMatch(this.entries[index], newEntry);
        if (entryChanged) {
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

  // # Tags

  getSelectedTags(): string[] {
    return this.selectedTags;
  }

  setSelectedTags(tags: string[]): void {
    this.selectedTags = tags;
  }

  clearSelectedTags(): void {
    this.selectedTags = [];
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

  // # Preferences CRUD

  getPreferences(): any {
    return this.preferences;
  }

  getPreference(preference: string): any {
    return this.preferences[preference];
  }

  setPreference(preference: string, setting: any): void {
    this.preferences[preference] = setting;
    this.savePreferencesToLocalStorage();
    if (preference == 'sortWordListBy') {
      this.sortEntries();
    }
    console.log('preferences: ', this.preferences );
  }

  // # Sample Data add/remove

  loadSampleData(): void {
    if (this.preferences.sampleDataLoaded) {
      console.error('Sample data already loaded');
      return;
    }
    let data = sampleWords;
    for (let word of data) {
      let index = this.entries.findIndex(r => r.text === word.text);
      if (index == -1) {
        word.dateAdded = new Date();
        this.entries.push(word);
      }
    }
    this.saveEntriesToLocalStorage();
    this.setPreference('sampleDataLoaded', true);
  }

  removeSampleData(): void {
    this.entries = this.entries.filter(e => !e.sampleData);
    this.saveEntriesToLocalStorage();
    this.setPreference('sampleDataLoaded', false);
  }

  // # LocalStorage private functions

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

    if (loadedEntries !== null) {
      this.entries = loadedEntries;
      this.sortEntries();
    } else {
      this.entries = [];
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
        sampleDataLoaded: false,
        useStarRating: true,
        sortWordListBy: 'newest',
        exploreDisplaySize: 'normal',
        useSource: false
      };
    }
  }

  private savePreferencesToLocalStorage(): void {
    localStorage.setItem('preferences', JSON.stringify(this.preferences));
  }

  // # Utilitiy Functions

  private sortEntries(): void {
    if (!this.entries) return;
    switch (this.preferences.sortWordListBy) {
      case ('newest'):
      this.entries.sort((a:Entry, b:Entry) => {
        if (a.dateAdded <  b.dateAdded) return 1;
        if (a.dateAdded == b.dateAdded) return 0;
        if (a.dateAdded >  b.dateAdded) return -1;
      });
      break;
      case ('oldest'):
      this.entries.sort((a:Entry, b:Entry) => {
        if (a.dateAdded >  b.dateAdded) return 1;
        if (a.dateAdded == b.dateAdded) return 0;
        if (a.dateAdded <  b.dateAdded) return -1;
      });
      break;
      case ('alpha'):
        this.entries.sort((a:Entry, b:Entry) => {
          if (a.text.toUpperCase() >  b.text.toUpperCase()) return 1;
          if (a.text.toUpperCase() == b.text.toUpperCase()) return 0;
          if (a.text.toUpperCase() <  b.text.toUpperCase()) return -1;
        });
        break;
    }
  }

  private convertTagStringToTags(tagString: string): string[] {
    const newTags: string[] = tagString.split(this.preferences.tagEntrySeparator);
    const newTagsTrimmed = newTags.map(x => {
      x.trim();
      x = x.replace(',', '');
      return x;
    });

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