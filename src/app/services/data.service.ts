import { Injectable } from '@angular/core';
import { Entry } from '../models/Entry';

@Injectable()
export class DataService {
  entries: Entry[];
  preferences;

  constructor(){
    this.entries = [
      {
        text: 'consonant',
        definition: 'in agreement or harmony',
        tags: [ 'adjective', 'positive', 'relational' ]
      },
      { text: 'desultory', definition: '', tags: [] },
      { text: 'insouciant', definition: '', tags: [] },
      { text: 'claptrap', definition: '', tags: [] },
      { text: 'Discrete bilateral channel', definition: '', tags: [] },
      { text: 'contumaciously', definition: '', tags: [] },
      { text: 'elan', definition: '', tags: [] },
      { text: 'Stuzzi botz', definition: '', tags: [] },
      { text: 'invective', definition: '', tags: [] },
      { text: 'altacocker', definition: '', tags: [] },
      { text: 'mordant', definition: '', tags: [] },
      { text: 'apres nous, le deluge!', definition: '', tags: [] },
      { text: 'quixotic', definition: '', tags: [] },
      { text: 'ignominious', definition: '', tags: [] },
      { text: 'paroxysm', definition: '', tags: [] }
    ];

    this.preferences = {
      tagEntrySeparator: ','
    };
  }

  getEntries(): Entry[] {
    return this.entries;
  }

  getEntry(text): Entry {
    let result = this.entries.find(r => r.text === text);
    return result;
  }

  addOrUpdateEntry(newEntry: Entry): void {
    if (newEntry.text && newEntry.text !== '') {
      let index = this.entries.findIndex(r => r.text === newEntry.text);

      if (index == -1) {
        console.log('DataService adding new entry: ', newEntry);
        this.entries.unshift(newEntry);
      } else {
        console.log('duplicate entry!');
        this.entries.splice(index, 1, newEntry)
      }
    }
  }

  addTags(entry: Entry, tagString: string): void {
    let newTags: string[] = tagString.split(this.preferences.tagEntrySeparator);
  }


}