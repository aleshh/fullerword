import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'

import { oxfordCredentials } from './credentials';

@Injectable()
export class DictionaryService {

  constructor(public http: HttpClient){  }

  getDefinition(word: string) {

    // http
    // .post('/api/items/add', body, {
    //   headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
    // })
    // .subscribe();

    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "app_id": oxfordCredentials.app_id,
        "app_key": oxfordCredentials.app_key
      })
    };

    return this.http.get(
      'https://od-api.oxforddictionaries.com/api/v1/en/' + word,
      {
        headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
      }
    )
      .map(res => {
        // res.json()
        console.log(res);
      });
  }

}