import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
// import 'rxjs/add/operator/map';

import { oxfordCredentials } from './credentials';
import { DictionaryEntry } from '../models/DictionaryEntry';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class DictionaryService {

  constructor(public http: HttpClient){}

  getDefinition(word: string) {

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Accept": "application/json",
    //     "app_id": oxfordCredentials.app_id,
    //     "app_key": oxfordCredentials.app_key
    //   })
    // };

    return this.http
      .get<DictionaryEntry>(
        'https://od-api.oxforddictionaries.com/api/v1/entries/en/'
        + word + '/regions=US',
        {
          headers: new HttpHeaders()
          .set('Accept', 'application/json')
          .set('app_id', oxfordCredentials.app_id)
          .set('app_key', oxfordCredentials.app_key)
          // ,observe: 'response'
        })
        ;
      // .catch((error: any) => {
      //   console.log('http error: ', error);
      //   return Observable.empty();
      // });
  }

}