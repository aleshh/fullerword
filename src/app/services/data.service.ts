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
        this.entries.unshift(newEntry);
      } else {
        this.entries.splice(index, 1, newEntry)
      }
      this.saveEntriesToLocalStorage();
    }
  }

  deleteEntry(entryToDelete: Entry): void {
    let index = this.entries.findIndex(r => r.text === entryToDelete.text);
    this.entries.splice(index, 1);
    this.saveEntriesToLocalStorage();
  }

  getTagList(): object[] {
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
    return tagSet;
  }

  private convertTagStringToTags(tagString: string): string[] {
    let newTags: string[] = tagString.split(this.preferences.tagEntrySeparator);
    let newTagsTrimmed = newTags.map(x => x.trim());
    return newTagsTrimmed;
  }

}