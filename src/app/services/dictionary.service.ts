import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import 'rxjs/add/map';
import 'rxjs/add/operator/map'

@Injectable()
export class DictionaryService {

  constructor(public http: Http){}

  getDefinition(word: string) {
    return this.http.get('https://od-api.oxforddictionaries.com/api/v1/en/' + word)
      .map(res => res.json());
  }

}