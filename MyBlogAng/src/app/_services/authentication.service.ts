import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { GlobalConstants } from '../shared/global-constants';

//import { AppSettings } from '../shared/appsettings';
//import { AppSettingsService } from '../shared/appsettings.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    //settings: AppSettings;
  apiURL = GlobalConstants.apiURL;

  constructor(private http: HttpClient) {//private appSettingsService: AppSettingsService
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
      return this.http.get<User>(this.apiURL + '/'+username+'/'+ password+'/Login')
      //return this.http.post<any>('http://localhost/api/users/authenticate', { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user.username == username && user.password == password) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
        }));
      //var pp = new User();
      //pp.id = 5;
      //pp.Name = "Paneer Chilly";
      //pp.Category = "from Koko mart 4th ee";      
      //pp.Price = 134.39;
      //pp.Country= "India";
      //pp.State= "Karnatak";
      //pp.Active = true;
      //pp.username= "Kanhu";
      //pp.password= "abc123";
      //pp.lastName= "Samal";
      //pp.firstName= "Ashirbad";
      //pp.token = "xyz1"

      //localStorage.setItem('currentUser', JSON.stringify(pp));
      //this.currentUserSubject.next(pp);
      //return of(pp);
      //User usr = new User();
      //usr["id"] = 4;
      //return usr;

        //"id": 4,
        //  "Name": "Paneer Chilly",
        //    "Category": "from Koko mart 4th ee",
        //      "Price": 134.39,
        //        "Country": "India",
        //          "State": "Karnatak",
        //            "Active": true,
        //              "username": "Kanhu",
        //                "password": "abc123",
        //                  "lastName": "Samal",
        //                    "firstName": "Ashirbad",
        //                      "token": "xyz1"}
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
