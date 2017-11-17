import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'

import { oxfordCredentials } from './credentials';

@Injectable()
export class DictionaryService {

  constructor(public http: HttpClient){  }

  getDefinition(word: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "app_id": oxfordCredentials.app_id,
        "app_key": oxfordCredentials.app_key
      })
    };

    return this.http.get(
      'https://od-api.oxforddictionaries.com/api/v1/entries/en/' + word,
      {
        headers: new HttpHeaders()
        .set('Accept', 'application/json')
        .set('app_id', oxfordCredentials.app_id)
        .set('app_key', oxfordCredentials.app_key)
      }
    )
      .map(res => {
        // res.json()
        console.log(res);
      });
  }

}