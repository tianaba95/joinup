import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';


@Injectable()
export class PageTitleService {

  constructor(private http: Http) { }
  
  public title: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  setTitle(value: string) {
    this.title.next(value);
  }

  getLocation(term: string):Promise<any> {
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + term )
         .toPromise()
         .then((response) => Promise.resolve(response.json()));
 }

  getTimeZone(lat, long,timestamp) {
    return this.http.get(
      'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat+','+long + '&timestamp=' + timestamp + '&key=AIzaSyB499Vx-A75gbUYXrAegGwX-3cxZcVirm8')
    .toPromise()
    .then((response) => Promise.resolve(response.json()));
  }
}