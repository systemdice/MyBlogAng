import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
import { User } from './_models';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LogoutComponent } from './logout/logout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angular';
  time = new Date();
  timer;
  title = 'abcd';
  bookimageUri = "assets/hdfc.jpg";

  currentUser: User;
  currentUserSubscription: Subscription;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService, public matDialog: MatDialog
  ) {
    //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    //this.currentUser = "";
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
    //this.authenticationService.currentUser.subscribe(x => this.currentUser = x).unsubscribe();
  }

  logout() {
    this.currentUser.firstName = "";
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  
}
