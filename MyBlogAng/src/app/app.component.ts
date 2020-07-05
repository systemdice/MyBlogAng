import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService, UserService } from './_services';
import { User } from './_models';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { GlobalConstants } from './shared/global-constants';

const THEME_DARKNESS_SUFFIX = `-dark`;

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  themes: string[] = [
    "deeppurple-amber",
    "indigo-pink",
    "pink-bluegrey",
    "purple-green",
  ];

  @HostBinding('class') activeThemeCssClass: string;
  isThemeDark = false;
  activeTheme: string;
  tiles: any[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  name = 'Angular';
  time = new Date();
  timer;
  title = 'abcd';
  bookimageUri = "assets/hdfc.jpg";
  Role: boolean = false;

  currentUser: User;
  currentUserSubscription: Subscription;

  setTheme(theme: string, darkness: boolean = null) {
    if (darkness === null)
      darkness = this.isThemeDark;
    else if (this.isThemeDark === darkness) {
      if (this.activeTheme === theme) return;
    } else
      this.isThemeDark = darkness;

    this.activeTheme = theme;

    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme;

    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass))
      classList.replace(this.activeThemeCssClass, cssClass);
    else
      classList.add(cssClass);

    this.activeThemeCssClass = cssClass;
  }

  toggleDarkness() {
    this.setTheme(this.activeTheme, !this.isThemeDark);
  }


  constructor(
    private router: Router, public userService: UserService,
    private authenticationService: AuthenticationService, public matDialog: MatDialog, private overlayContainer: OverlayContainer
  ) {
    //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      
      //if (localStorage.getItem('Role') == 'Admin')
      //  this.Role = true;

      //alert(this.Role);
      
    });

  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  LoginValue: string = "No";
  ngOnInit() {
    //localStorage.setItem('LoginStatus', 'No');
    this.LoginValue = localStorage.getItem('LoginStatus');
    this.timer = setInterval(() => {
      this.time = new Date();
      
    }, 1000);
  }
  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    //this.currentUser = "";
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
    //this.authenticationService.currentUser.subscribe(x => this.currentUser = x).unsubscribe();
  }

  logout() {
    localStorage.setItem('LoginStatus', 'No');
    this.userService.rolel = 'No';
    this.LoginValue = localStorage.getItem('LoginStatus');
    if (this.currentUser != null) {
      this.currentUser.firstName = "";
    }
    this.authenticationService.logout();
    this.router.navigate(['/login']); // Logout
  }

  
}
