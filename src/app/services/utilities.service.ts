import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor(){
    console.log('utilities service: constructor ');
    console.log('test string: ', this.urlEncode('test string'));
  }

  // these will need work. see:
  // https://stackoverflow.com/questions/695438/safe-characters-for-friendly-url

  urlEncode(phrase: string): string {
    let newString = phrase.replace('-', '~');
    newString = newString.replace(' ', '-');
    return newString;
  }

  urlDecode(phrase: string): string {
    let newString = phrase.replace('-', ' ');
    newString = newString.replace('~', '-');
    return newString;
  }

}