import { Injectable } from '@angular/core';
import { Entry } from '../models/Entry';

@Injectable()
export class DataService {
  entries: Entry[];
  preferences;

  constructor(){
    this.entries = [];
    this.preferences = {
      tagEntrySeparator: ','
    };

    this.loadEntriesFromLocalStorage();
  }

  private loadEntriesFromLocalStorage(): void {
    var loadedEntries = JSON.parse(localStorage.getItem('entries'));
    if (loadedEntries !== undefined) {
      this.entries = loadedEntries;
    }
  }

  private saveEntriesToLocalStorage(): void {
    localStorage.setItem('entries', JSON.stringify(this.entries));
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