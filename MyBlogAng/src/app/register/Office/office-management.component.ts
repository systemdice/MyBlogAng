//----------** NOTES **-----------
//if error like 'ngModel cannot be used to register form controls with a parent formGroup directive' Try using
//formGroup's partner directive "formControlName" instead.  Example:
//THEN
//We need to indicate that it's standalone and therefore it doesn't conflict with the form controls:
//[ngModelOptions] = "{standalone: true}"

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validator, Validators } from '@angular/forms'
import { MatRadioChange, MatRadioButton, MatTableDataSource, MatSort, MatPaginator, MatCheckboxChange } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


export interface Article {
  id: number;
  title: string;
  category: string;
  writer: string;
}
const LANGUAGESSample: any[] = [
  { id: 'H', name: 'Hindi' },
  { id: 'E', name: 'English' },
  { id: 'M', name: 'Marathi' },
  { id: 'T', name: 'Tamil' }
];

const All_ARTICLES: Article[] = [
  { id: 1, title: 'Angular 2 Tutorial', category: 'Angular', writer: 'Krishna' },
  { id: 2, title: 'Angular 6 Tutorial', category: 'Angular', writer: 'Mahesh' },
  { id: 3, title: 'Spring MVC tutorial', category: 'Spring', writer: 'Aman' },
  { id: 4, title: 'Spring Boot tutorial', category: 'Spring', writer: 'Suraj' },
  { id: 5, title: 'FreeMarker Tutorial', category: 'FreeMarker', writer: 'Krishna' },
  { id: 6, title: 'Thymeleaf Tutorial', category: 'Thymeleaf', writer: 'Mahesh' },
  { id: 7, title: 'Java 8 Tutorial', category: 'Java', writer: 'Aman' },
  { id: 8, title: 'Java 9 Tutorial', category: 'Java', writer: 'Suraj' }
];

@Component({
  selector: 'app-office-management',
  templateUrl: './office-management.component.html',
  styleUrls: ['./office-management.component.css']
})
export class OfficeManagementComponent implements OnInit {

  //Used for AUtocomplete
  myControl = new FormControl();
  options: string[] = ['One', 'Once', 'Two', 'Three', 'Anshika', 'Anshu'];
  filteredOptions: Observable<string[]>;

  //for list
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  //ended autocomplete
  name: string;
  trans: boolean = true;
  show: boolean = false;
  LANGUAGES: any[] = [
    { id: 'H', name: 'Hindi' },
    { id: 'E', name: 'English' },
    { id: 'M', name: 'Marathi' },
    { id: 'T', name: 'Tamil' }
  ];
  selectedGame: any = this.LANGUAGES[1].id;

  //
  select_all = false;
  data: any[] = [
    { id: 1, name: 'Anshika' },
    { id: 2, name: 'Ashika' }
  ]

  onSelectAll(e: any): void {
    for (let i = 0; i < this.data.length; i++) {
      const item = this.data[i];
      item.is_selected = e;
    }
  }
  onSelectAllIndividual(e: any): void {
    alert(e);
    if (e == false) {
      this.select_all = false;
    }
    //for (let i = 0; i < this.data.length; i++) {
    //  const item = this.data[i];
    //  item.is_selected = e;
    //}
  }

  constructor() {
    this.name = 'Welcome to Angular2 Spinner'
  }
  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    let mrButton: MatRadioButton = mrChange.source;
    console.log(mrButton.name);
    console.log(mrButton.checked);
    console.log(mrButton.inputId);
    console.log(mrButton.radioGroup.name);

  }
  abc() {
    this.selectedGame = this.LANGUAGES[1].id;

  }
  toggleSpinner() {
    this.show = !this.show;
    this.trans = !this.trans;

  }
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'title', 'category', 'writer'];
  dataSource = new MatTableDataSource(All_ARTICLES);

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.data[1].is_selected = true;
    //Used for AUtocomplete
    this.filteredOptions = this.myControl.valueChanges
      .pipe(startWith(''), map((value) => this._filter(value)));

    //ended autocomplete
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
