import { Injectable } from '@angular/core';
import { Entry } from '../models/Entry';

@Injectable()
export class DataService {
  entries: Entry[];

  constructor(){
    this.entries = [
      { text: 'consonant', definition: '' },
      { text: 'desultory', definition: '' },
      { text: 'insouciant', definition: '' },
      { text: 'claptrap', definition: '' },
      { text: 'Discrete bilateral channel', definition: '' },
      { text: 'contumaciously', definition: '' },
      { text: 'elan', definition: '' },
      { text: 'Stuzzi botz', definition: '' },
      { text: 'invective', definition: '' },
      { text: 'altacocker', definition: '' },
      { text: 'mordant', definition: '' },
      { text: 'apres nous, le deluge!', definition: '' },
      { text: 'quixotic', definition: '' },
      { text: 'ignominious', definition: '' },
      { text: 'paroxysm', definition: '' }
    ];
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

  }


}