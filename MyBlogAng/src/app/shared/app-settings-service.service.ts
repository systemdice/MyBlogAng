
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
//import { of } from 'rxjs';
//import { tap, map, filter,of } from 'rxjs/operators';
//import { of } from 'rxjs/operators'
//import 'rxjs/add/observable/of';
//import { of } from 'rxjs/add/observable/of';
import { AppSettings } from "./app-settings";
@Injectable({
  providedIn: 'root'
})
export class AppSettingsServiceService {
  constructor() { }
  getSettings(): Observable<AppSettings> {
    let settings = new AppSettings();
    return of<AppSettings>(settings);
  }
}
