import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService, AuthenticationService, AlertService } from '../_services';

import { AppSettings } from '../shared/app-settings';
import { AppSettingsServiceService } from '../shared/app-settings-service.service';
import { environment } from "../../environments/environment";
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { AddAgentInfoComponent } from './add-agent-info.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

interface DialogData {
  email: string;
  name: string;
}

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit
{
  users: User[] = [];
  displayedColumns = ['id', 'Name', 'Category', 'State', 'details', 'update', 'delete'];
  dataSource: MatTableDataSource<User>;
  email: string;
  data: DialogData;
  data1: Observable<any>;  

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UserService, private appSettingsService: AppSettingsServiceService, public dialog: MatDialog, private http: HttpClient) {
    // Create 100 users
      
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    //TRYING to implement time taking for data load
    //Don't forget to make your network slower to get a chance to see the loading overlay.
    //For Chrome users, go to the developer tools(F12), Network tab, and select the Slow 3G preset.
    this.data1 = this.http.get('https://jsonplaceholder.typicode.com/posts/1');
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  exportCsv(exportCsv):void {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddAgentInfoComponent, {
      width: '640px',height:'600px', disableClose: true, data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = result;
    });
  }
}






