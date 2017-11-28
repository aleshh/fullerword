import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor(){
  }

  // these will need work. see:
  // https://stackoverflow.com/questions/695438/safe-characters-for-friendly-url

  encodeUrl(phrase: string): string {
    let newString = phrase.replace(/-/g, '~');
    newString = newString.replace(/\s/g, '-');
    return newString;
  }

  decodeUrl(phrase: string): string {
    let newString = phrase.replace(/-/g, ' ');
    newString = newString.replace(/~/g, '-');
    return newString;
  }

}