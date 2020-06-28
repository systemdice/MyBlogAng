import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
import { DeleteAgentComponent } from '../dialogs/delete-agent.component';

import * as XLSX from 'xlsx';

type AOA = any[][];

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
  displayedColumns = ['id', 'Name', 'gender', 'contactNumber', 'className', 'schoolYear','dateStart', 'Category', 'Action'];
  dataSource: MatTableDataSource<User>;
  email: string;
  data: DialogData;
  data1: Observable<any>;  

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  @ViewChild('fileInput', { static: true }) fileInput;
  title = 'Excel';
  dataExcel: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.dataExcel = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
  ExportTOExcel() {
    //const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    //const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //XLSX.writeFile(wb, 'ScoreSheet.xlsx');
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data, { header: ['dataprop1', 'dataprop2'] });
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'filename.xlsx');
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('upload', this.fileInput.nativeElement.files[0])
    alert(JSON.stringify( formData));

    this.userService.UploadExcel(formData).subscribe(result => {
      //this.message = result.toString();
      this.loadAllUsers();
      alert('File upload and Student addition successfull')
    }); 
    

  } 
  //exportToExcel() {
  //  let dataToExport = this.dataSource.filteredData
  //    .map(x => ({
  //      DisplayName: x.DisplayName,
  //      Name: x.Name,
  //      Type: x.Type == '0' ? 'Partial' : 'Full'
  //    }));

  //  let workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
  //  let workBook: XLSX.WorkBook = XLSX.utils.book_new();

  //  // Adjust column width
  //  var wscols = [
  //    { wch: 50 },
  //    { wch: 50 },
  //    { wch: 30 }
  //  ];

  //  workSheet["!cols"] = wscols;

  //  XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
  //  XLSX.writeFile(workBook, `${this.exportToExcelFileName}.xlsx`);
  //}

  constructor(private userService: UserService, private appSettingsService: AppSettingsServiceService, public dialog: MatDialog, private http: HttpClient) {
    // Create 100 users
      
  }

  ngOnInit() {
    this.loadAllUsers();
  }



  private loadAllUsers() {
    this.filterName = "";
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

  filterName: string;
  loadShowAllUsers() {
    this.filterName = '';
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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

  id: number;

  openDialog(i: number, id: number, Name: string, Category: String, row: any): void {
    //alert(JSON.stringify( row));
    this.id = id;
    const dialogRef = this.dialog.open(AddAgentInfoComponent, {
      width: '640px', height: '600px', disableClose: true, data: { id: id, Name: Name, category: Category, row: row, AddEdit:'Edit',User:User}
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.data = result;
      this.loadAllUsers();
    });//
  }
  openDialogNew(AddNew:string): void {
    //alert(JSON.stringify(row));
    //this.id = id;
    const dialogRef = this.dialog.open(AddAgentInfoComponent, {
      width: '640px', height: '600px', disableClose: true, data: {AddEdit:'Add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        //alert('true part')
      }
      else {  this.loadAllUsers();}
      //this.data = result;
      this.loadAllUsers();
    });
  }

  deleteItem(i: number, id: number) {
    //this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteAgentComponent, {
      data: { id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        //// for delete we use splice in order to remove single object from DataService
        //this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        //this.refreshTable();
        this.loadAllUsers();
      }
      this.data = result;
    });
  }

  //startEdit(i: number, id: number, Name: string, Category: string, Price: string) {
  //  this.id = id;
  //  // index row is used just for debugging proposes and can be removed
  //  this.index = i;
  //  console.log(this.index);
  //  const dialogRef = this.dialog.open(EditAgentComponent, {
  //    data: { id: id, Name: Name, Category: Category, Price: Price }
  //  });
}






