import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

import { NgForm } from '@angular/forms'

//import { EmployeeService } from '../shared/employee.service'
//import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public edited = true;
  public employeeService: any;
  constructor() {}
 

  ngOnInit() {
  this.saveTodos();
  this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    //this.employeeService.selectedEmployee = {
    //  EmployeeID: null,
    //  FirstName: '',
    //  LastName: '',
    //  EmpCode: '',
    //  Position: '',
    //  Office: ''
    //}
  }

  onSubmit(form: NgForm) {
    if (form.value.EmployeeID == null) {
      //this.employeeService.postEmployee(form.value)
      //  .subscribe(data => {
      //    this.resetForm(form);
      //    this.employeeService.getEmployeeList();
      //    this.toastr.success('New Record Added Succcessfully', 'Employee Register');
      //  })
    }
    else {
      //this.employeeService.putEmployee(form.value.EmployeeID, form.value)
      //  .subscribe(data => {
      //    this.resetForm(form);
      //    this.employeeService.getEmployeeList();
      //    this.toastr.info('Record Updated Successfully!', 'Employee Register');
      //  });
    }
  }

  saveTodos(): void {

    //this.toastr.success('New Record Added Succcessfully', 'Employee Register');
    //show box msg
    this.edited = true;
    //wait 3 Seconds and hide
    setTimeout(function () {
      this.edited = false;
      console.log(this.edited);
    }.bind(this), 1000);
  }

}
