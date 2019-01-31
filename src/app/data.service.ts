import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8',
  })
};
/*for remote use*/
// const ServerUrl = 'http://YOURIPADDRESS:3000/messages';

/*for local use*/
const ServerUrl = 'http://localhost:3000/messages';

const APIUrl = 'https://api.chucknorris.io/jokes/random';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getQuote() {
    return this.http.get(APIUrl);
  }

  postTo(params) {
    const newParam = JSON.stringify({
      msg: params
    });
    // console.log(newParam);
    return this.http.post(ServerUrl, newParam, httpOptions);

  }
}
