
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService, AlertService } from '../_services';

import { AppSettings } from '../shared/app-settings';
import { AppSettingsServiceService } from '../shared/app-settings-service.service';
import { environment } from "../../environments/environment"

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
  users: User[] = [];
  usersAll: any;
  id: string;
  private settings: AppSettings;
    constructor(
      private authenticationService: AuthenticationService, private alertService: AlertService,
      private userService: UserService, private appSettingsService: AppSettingsServiceService,
      private route: ActivatedRoute,
      private router: Router
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
      });
      console.log('liku');
      this.route.params.subscribe(params => {
        this.id = this.route.snapshot.paramMap.get('id');
        //alert(this.id);
      });
      //this.id = this.route.snapshot.paramMap.get('id');
      //alert(this.id)

    }

    ngOnInit() {
      this.loadAllUsers();
      this.appSettingsService.getSettings()
        .subscribe(settings => this.settings = settings,
          () => null,
        () => {
          //alert(environment.securityApi)
            //alert( this.settings.defaultPrice);
            //alert( this.settings.defaultUrl);
          });
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        
    }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      //setTimeout(() => { this.users = users; }, 4000) // if we want to delay the loading

      this.users = users;
      this.usersAll = JSON.stringify(this.users);
      this.alertService.success('success');
    });
        //this.userService.getAll().pipe(first()).subscribe(users => {
        //    this.users = us(rs;
        //});
    }
}
