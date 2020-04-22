import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Expense } from '../_models';
//import { AppSettings }   from '../shared/appsettings';
//import { AppSettingsService }  from '../shared/appsettings.service';
import { GlobalConstants } from '../shared/global-constants';
@Injectable({ providedIn: 'root' })
export class UserService {
  //settings: AppSettings;
  apiURL = GlobalConstants.apiURL;
  apiURLUptoAPI = GlobalConstants.apiURLUptoAPI;
  constructor(private http: HttpClient) { }

    getAll() {
      //return this.http.get<User[]>(this.settings.apiUrl+'/users');
      return this.http.get<User[]>(this.apiURL);
  }
  getAllTransaction() {
    //return this.http.get<User[]>(this.settings.apiUrl+'/users');
    return this.http.get<Expense[]>(this.apiURLUptoAPI);
  }

    //getById(id: number) {
    //    return this.http.get(`${config.apiUrl}/users/${id}`);
    //}

    //register(user: User) {
    //    return this.http.post(`${config.apiUrl}/users/register`, user);
    //}

    //update(user: User) {
    //    return this.http.put(`${config.apiUrl}/users/${user.id}`, user);
    //}

    //delete(id: number) {
    //    return this.http.delete(`${config.apiUrl}/users/${id}`);
    //}
}
