import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../_services/data.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Issue } from '../_models/issue';
import { DataSource } from '@angular/cdk/collections';
import { AddAgentComponent } from '../dialogs/add-agent.component';
import { EditAgentComponent } from '../dialogs/edit-agent.component';
import { DeleteAgentComponent } from '../dialogs/delete-agent.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserService } from '../_services';
import { GraphData } from '../_models';
import { Chart } from 'chart.js';
//import * as Chart from 'chart.js';


//@Component({ templateUrl: 'register.component.html' })
@Component({
  selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data: GraphData[];
  Name = [];
  Price = [];
  Linechart: any = [];
  Barchart: any = [];
  //@ViewChild('canvas1', { static: true }) canvas1: ElementRef;
  name = 'Angular   6';
  canvas: any;
  ctx: any;
  @ViewChild('myChart', { static: true }) myChart;
  @ViewChild('myBarchart', { static: true }) myBarchart;
  @ViewChild('myPiechart', { static: true }) myPiechart;


  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false, //this is needed explicitely for controlling the graph width and height
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  



  displayedColumns = ['id', 'title', 'state', 'url', 'created_at', 'updated_at', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
    

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: DataService, private userService: UserService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  ngOnInit() {
    this.loadData();
    //this.loadTransData();
    
    //var canvas1 = document.getElementById('graph');
    //var canvas = document.getElementsByTagName('canvas')[0];
    //canvas1.width = 200;
    //canvas.height = 300;
  }

  refresh() {
    this.loadData();
  }

  addNew(issue: Issue) {
    const dialogRef = this.dialog.open(AddAgentComponent, {
      data: { issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditAgentComponent, {
      data: { id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, title: string, state: string, url: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteAgentComponent, {
      data: { id: id, title: title, state: state, url: url }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/



  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }///////////////////////
  PrepareChatData() {
    this.Name = [];
    this.Price = [];
    this.userService.getAllTransaction().subscribe((result: GraphData[]) => {
      result.forEach(x => {
        this.Name.push(x.Name);
        this.Price.push(x.Who);
      });
    });
  }
  private loadExpenseLINEData() {
    //this.PrepareChatData();
    //this.ctx = document.getElementById("canvas1")[0].getContext("2d");
    //this.userService.getAllTransaction().subscribe((result: GraphData[]) => {
    //  result.forEach(x => {
    //    this.Name.push(x.Name);
    //    this.Price.push(x.Who);
    //  });
    this.canvas = this.myChart.nativeElement;
      this.ctx = this.canvas.getContext('2d');
      this.Linechart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: this.Name,
          datasets: [
            {
              
              data: this.Price,
              borderColor: '#3cb371',
              backgroundColor: "#0000FF",

            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    
  }
  private loadExpenseBARData() {
    //this.PrepareChatData();
    //this.ctx = document.getElementById("canvas1")[0].getContext("2d");
    //this.userService.getAllTransaction().subscribe((result: GraphData[]) => {
    //  result.forEach(x => {
    //    this.Name.push(x.Name);
    //    this.Price.push(x.Who);
    //  });
    this.canvas = this.myBarchart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.Barchart = new Chart(this.ctx, {
      
      type: 'bar',
      data: {
        labels: this.Name,
        datasets: [
          {
            label: 'Price',
            data: this.Price,
            borderColor: '#3cba9f',
            backgroundColor: [
              "#3cb371",
              "#0000FF",
              "#9966FF",
              "#4C4CFF",
              "#00FFFF",
              "#f990a7",
              "#aad2ed",
              "#FF00FF",
              "Blue",
              "Red",
              "Blue"
            ],
            fill: true
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'my bar chat'
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });  

  }
  private loadExpensePIEData() {
    //this.PrepareChatData();
    //this.ctx = document.getElementById("canvas1")[0].getContext("2d");
    //this.userService.getAllTransaction().subscribe((result: GraphData[]) => {
    //  result.forEach(x => {
    //    this.Name.push(x.Name);
    //    this.Price.push(x.Who);
    //  });
    this.canvas = this.myPiechart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.Barchart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: this.Name,
        datasets: [
          {
            data: this.Price,
            borderColor: '#3cba9f',
            backgroundColor: [
              "#3cb371",
              "#0000FF",
              "#9966FF",
              "#4C4CFF",
              
            ],
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: true,
          
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

  }

  ngAfterViewInit() {
    this.PrepareChatData();
    setTimeout(() => {
      console.log('Test');
      this.loadExpenseLINEData();
      this.loadExpenseBARData();
      this.loadExpensePIEData();
    }, 3000);
    
  }
  
}


export class ExampleDataSource extends DataSource<Issue> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  constructor(public _exampleDatabase: DataService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Issue[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
        const searchStr = (issue.id + issue.title + issue.url + issue.created_at).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() { }


  /** Returns a sorted copy of the database data. */
  sortData(data: Issue[]): Issue[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'state': [propertyA, propertyB] = [a.state, b.state]; break;
        case 'url': [propertyA, propertyB] = [a.url, b.url]; break;
        case 'created_at': [propertyA, propertyB] = [a.created_at, b.created_at]; break;
        case 'updated_at': [propertyA, propertyB] = [a.updated_at, b.updated_at]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
