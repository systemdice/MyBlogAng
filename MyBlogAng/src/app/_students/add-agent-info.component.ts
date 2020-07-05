import { Component, OnInit, VERSION, ViewChild, Inject, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { saveAs } from 'file-saver';
//import { DeleteComponent } from '../delete/delete.component';
import { Router } from '@angular/router';
import { StudentMarksComponent } from './student-marks.component';
import { UserService } from '../_services';
import { AppSettingsServiceService } from '../shared/app-settings-service.service';
import { User } from '../_models';
import { Observable } from 'rxjs';
import * as _ from "lodash";

interface DialogData {
  id: number;
  email: string;
  name: string;
  category: string,
  row: any;
  AddEdit: string;
}

export interface Hobby {
  id: number;
  name: string;
}
export interface gender {
  id: string;
  name: string;
}

interface Category {
  id: number;
  name: string;
}
interface Classes {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-agent-info',
  templateUrl: './add-agent-info.component.html',
  styleUrls: ['./add-agent-info.component.css']
})
export class AddAgentInfoComponent implements OnInit {
  public breakpoint: number; // Breakpoint observer code
  public fname: string = 'Rames';
  public lname: string = 'Suresh';
  public addCusForm: FormGroup;
  wasFormChanged = false;
  animal: any;
  //dialogRef: any;
  AddorEdit: string = 'Edit ';
  dataSaved = false;
  employeeForm: any;
  allEmployees: Observable<User[]>;
  employeeIdUpdate = null;
  massage = null;
  Categories: Category[] = [
    { id: 1, name: 'General' },
    { id: 2, name: 'SC' },
    { id: 3, name: 'ST' }
  ];

  classes: Classes[] = [
    { id: 1, name: 'Pre Primary' },
    { id: 2, name: 'Nursery' },
    { id: 3, name: 'Lower Kinder Garten (LKG)' },
    { id: 4, name: 'Upper Kinder Garten (UKG)' },
    { id: 5, name: 'I (Ist)' },
    { id: 6, name: 'II (2nd)' },
    { id: 7, name: 'III (3rd)' },
    { id: 8, name: 'IV (4th)' },
    { id: 9, name: 'V (5th)' },
  ];
  row: User;
  //row = {
  //  Active: true, Category: "", Country: "India", Name: "", Price: 0.00, State: "", firstName: "", id: 2, lastName: "", password: "", token:
  //    "xyz1", username: ""
  //}
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins'];
  selectedHobbiesNames: [string];
  myhobbies: any = [
    {
      name: "Sports",
      value: "sports"
    },
    {
      name: "Music",
      value: "music",
      selected: true
    },
    {
      name: "Movie",
      value: "movie",
      selected: true
    },
    {
      name: "Reading",
      value: "reading"
    },
    {
      name: "Writing",
      value: "writing"
    }
  ];
  paidStatus: any = ['Paid', 'UnPaid', 'Partial', 'Other']
  countries: any = [
    {
      full: "Great Britain",
      short: "GB"
    },
    {
      full: "United States",
      short: "US"
    },
    {
      full: "Canada",
      short: "CA"
    }
  ];
  selectedCountry: string = "GB";
  selectedCountryControl = new FormControl(this.selectedCountry);
  selectedCountryControlT2 = new FormControl(this.selectedCountry);
  selectedCountryControlT3 = new FormControl(this.selectedCountry);
  selectedCountryControlT4 = new FormControl(this.selectedCountry);
  gender: gender[] = [
    { id: 'm', name: 'Male' },
    { id: 'f', name: 'Female' }
  ]; 

studentHobbyData: any[] = [
    { id: 0, name: 'Singing' },
    { id: 1, name: 'Drawing' },
    { id: 2, name: 'Playing' },
    { id: 3, name: 'Newspaper' }
  ];

  constructor(
    private fb: FormBuilder, private userService: UserService, private appSettingsService: AppSettingsServiceService, private cd: ChangeDetectorRef,
    public dialog: MatDialog, public dialogRef: MatDialogRef<AddAgentInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
//this.gender = ['Male', 'Female'];
    
 }
  controls = this.studentHobbyData.map(c => new FormControl(false));
  public ngOnInit(): void {
    
    //const controls = this.studentHobbyData.map(c => new FormControl(false));
    //controls[2].setValue(true);
    //controls[3].setValue(true);
    

    this.addCusForm = this.fb.group({
      //IdProof: null,
      Name: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      //Price: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      gender: ['Female', [Validators.required]],
      //hobbies: this.createHobbies(this.myhobbies),
      //hobbies: new FormArray([]),
      //hobbies: this.fb.array([]),
      hobbies: new FormArray(this.controls),
      contactNumber: ['', [Validators.required]],
      joiningYear: ['', Validators.maxLength(4)],
      schoolYear: ['', [Validators.required]],
      studentType: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      emgContactNumber: ['', [Validators.required]],
      currAddress: ['', [Validators.required]],
      permAddress: ['', [Validators.required]],
      healthDetails: ['', [Validators.required]],
      langKnown: ['', [Validators.required]],
      totalAmt: ['', [Validators.required]],
      selectedCountryControl: [''],
      selectedCountryControlT2: [''],
      selectedCountryControlT3: [''],
      selectedCountryControlT4: [''],
      dateStart:['', [Validators.required]],
      dateEnd:['', [Validators.required]],
      className: ['', [Validators.required]],
      Active: [''],
      file: [null]
    });
    //this.addHobbyCheckboxes();
    //this.Repopulate(controls);
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
    //this.studentHobbyData[1].is_selected = true;
    //this.studentHobbyData[2].is_selected = true;

    //alert(this.data.row.firstName);
    if (this.data.AddEdit == 'Add') {
      this.AddorEdit = 'Add new ';
      this.employeeIdUpdate = null;
    }
    else {
      this.employeeIdUpdate = 'yes';
      //this.row = this.data.user;
      this.loadEmployeeToEdit(this.data.row);
      this.Repopulate(this.data.row.hobbies);
      //this.row['Name'] = '';
      //alert(JSON.stringify(this.data.row));
      //alert(this.data.row.id ='---'+ this.data.id);
    }
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  createHobbies(hobbiesInputs) {
    const arr = hobbiesInputs.map(hobby => {
      return new FormControl(hobby.selected || false);
    });
    return new FormArray(arr);
  }

  getSelectedHobbies() {
    this.selectedHobbiesNames = _.map(
      this.addCusForm.controls.hobbies["controls"],
      (hobby, i) => {
        return hobby.name && this.myhobbies[i].name;
      }
    );
    this.getSelectedHobbiesName();
  }

  getSelectedHobbiesName() {
    this.selectedHobbiesNames = _.filter(
      this.selectedHobbiesNames,
      function (hobby) {
        if (hobby !== false) {
          return hobby;
        }
      }
    );
  }

  public onAddCus(): void {
    this.markAsDirty(this.addCusForm);
  }

  @ViewChild('fileInput', {static:true}) el: ElementRef;
  imageUpload: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  imageFileName: any;
  editFile: boolean = true;
  removeUpload: boolean = false;
  imageUrl: any;

  handleFileInput(files: FileList) {
    this.imageUpload = files.item(0);
    this.imageFileName = "xyz";
    //saveAs(this.imageUpload,'../assets/images/xyz1.png');
    // how to use FileSaver here ? 
    //this.imageUpload doesn't have data or something like this
    //var data = new Blob([this.imageUpload], { 'your file type here' });
    saveAs(this.imageUpload, '../assets/images/xyz1.png');  

  }

  private addHobbyCheckboxes() {
    this.studentHobbyData.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.addCusForm.controls.hobbies as FormArray).push(control);
    });
  }
  base64File: string = null;
  filename: string = null;
  onFileSelect(e: any): void {
    try {
      const file = e.target.files[0];
      const fReader = new FileReader()
      fReader.readAsDataURL(file)
      fReader.onloadend = (_event: any) => {
        this.filename = file.name;
        this.base64File = _event.target.result;
      }
      saveAs(file, 'c:\aa.png');
    } catch (error) {
      this.filename = null;
      this.base64File = null;
      console.log('no file was selected...');
    }
  }

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.addCusForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;

        const blob = new Blob([reader.result]);
        saveAs(blob, 'out.bmp');
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  checkedList: any[] = [];
  public onCheckboxChange(option, event) {
    if (event.checked) {
      this.checkedList.push(option.id);
    } else {
      for (var i = 0; i < this.studentHobbyData.length; i++) {
        if (this.checkedList[i] == option.id) {
          this.checkedList.splice(i, 1); 
          this.studentHobbyData[i].is_selected = true;
        }
      }
    }
    console.log('selected value' + this.checkedList);
    console.log('isseleted' + this.studentHobbyData);
  }

  public Repopulate(dataParam:any[]) {
    //const controls = this.studentHobbyData.map(c => new FormControl(false));
    //alert(JSON.stringify(controls));
    //controls[2].setValue(true);
    for (let i = 0; i < dataParam.length; i++)   {
       for (let j = 0; j < this.studentHobbyData.length; j++) {
         if (dataParam[i] == this.studentHobbyData[j].name)
           this.controls[j].setValue(true);
       }      
     }
    console.log(dataParam);
    //this.studentHobbyData[1].checked = true;
    //this.studentHobbyData[0].is_selected = true;
    //this.studentHobbyData[1].is_selected = true;
  }

  openDialog(): void {
    //console.log(this.wasFormChanged);
    //if (this.addCusForm.dirty) {
    //  const dialogRef = this.dialog.open(StudentMarksComponent, {
    //    width: '340px',
    //  });

    //  dialogRef.afterClosed().subscribe(result => {
    //    console.log('The dialog was closed');
    //    this.animal = result;
    //  });

    //} else {
    //  this.dialog.closeAll();
    //}
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
    this.dialog.closeAll();
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.data.name = "Jay jagganath";
    //this.data.email = "badathakura@puri.com";
  }
  getHobbies() {
    //let p:string = "";
    //this.addCusForm.controls.hobbies.forEach(function (value) {
    //  p += value +":";
    //});
    //this.addCusForm.patchValue({ hobbies: p });
    const selectedOrderIds = this.addCusForm.value.hobbies
      .map((v, i) => v ? this.studentHobbyData[i].name : null)
      .filter(v => v !== null);
    this.addCusForm.patchValue({ hobbies: selectedOrderIds });
  }

  //onChange(name: string, isChecked: boolean) {
  //  const cartoons = (this.addCusForm.controls.hobbies as FormArray);

  //  if (isChecked) {
  //    cartoons.push(new FormControl(name));
  //  } else {
  //    const index = cartoons.controls.findIndex(x => x.value === name);
  //    cartoons.removeAt(index);
  //  }
  //}
  onFormSubmit() {
    //this.addCusForm.patchValue({ hobbies: 1 });
    this.getHobbies();
    //this.dataSaved = false;
    const student = this.addCusForm.value;
    this.CreateStudent(student);
    this.addCusForm.reset();

    
  }
  loadEmployeeToEdit(employee: User) {
    this.massage = null;
    this.dataSaved = false;
    this.employeeIdUpdate = employee.id;
    this.addCusForm.controls['Name'].setValue(employee.Name);
    this.addCusForm.controls['Category'].setValue(employee.Category);
    this.addCusForm.controls['firstName'].setValue(employee.firstName);
    this.addCusForm.controls['lastName'].setValue(employee.lastName);
    this.addCusForm.controls['fatherName'].setValue(employee.lastName);
    this.addCusForm.controls['motherName'].setValue(employee.fatherName);
    this.addCusForm.controls['gender'].setValue(employee.gender);
    this.addCusForm.controls['contactNumber'].setValue(employee.contactNumber);
    this.addCusForm.controls['className'].setValue(employee.className);

    this.addCusForm.controls['totalAmt'].setValue(employee.totalAmt);
    this.addCusForm.controls['studentType'].setValue(employee.studentType);
    this.addCusForm.controls['emailAddress'].setValue(employee.emailAddress);
    this.addCusForm.controls['emgContactNumber'].setValue(employee.emgContactNumber);
    this.addCusForm.controls['currAddress'].setValue(employee.currAddress);
    this.addCusForm.controls['permAddress'].setValue(employee.permAddress);
    this.addCusForm.controls['healthDetails'].setValue(employee.healthDetails);
    this.addCusForm.controls['langKnown'].setValue(employee.langKnown);

    this.addCusForm.controls['joiningYear'].setValue(employee.joiningYear);
    this.addCusForm.controls['schoolYear'].setValue(employee.schoolYear);
    this.addCusForm.controls['studentType'].setValue(employee.studentType);
    


    this.addCusForm.controls['dateStart'].setValue(employee.dateStart);
    this.addCusForm.controls['dateEnd'].setValue(employee.dateEnd);
this.addCusForm.controls['selectedCountryControl'].setValue(employee.selectedCountryControl);
this.addCusForm.controls['selectedCountryControlT2'].setValue(employee.selectedCountryControlT2);
    this.addCusForm.controls['selectedCountryControlT3'].setValue(employee.selectedCountryControlT3);
this.addCusForm.controls['selectedCountryControlT4'].setValue(employee.selectedCountryControlT4);
    this.addCusForm.controls['Active'].setValue(employee.Active);
    this.Repopulate(employee.hobbies);
  }  

  CreateStudent(student: User) {
    if (this.employeeIdUpdate == null) {
      this.userService.createStudent(student).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          alert('Student data saved Successfully');
          //this.loadAllEmployees();
          this.employeeIdUpdate = null;
          this.addCusForm.reset();
        }
      );
    } else {
      //employee.EmpId = this.row.id;
      this.userService.updateStudent(this.data.id,student).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        //this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      });
    }
  }
  deleteEmployee(employeeId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.userService.deleteStudentById(employeeId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Succefully';
        //this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();

      });
    }

  }
}
