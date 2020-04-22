import { Component, OnInit, VERSION, ViewChild, Inject  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { DeleteComponent } from '../delete/delete.component';
import { Router } from '@angular/router';
import { StudentMarksComponent } from './student-marks.component';

interface DialogData {
  email: string;
  name: string;
}

@Component({
  selector: 'app-add-agent-info',
  templateUrl: './add-agent-info.component.html',
  styleUrls: ['./add-agent-info.component.css']
})
export class AddAgentInfoComponent implements OnInit {
  public breakpoint: number; // Breakpoint observer code
  public fname: string = `Ramesh`;
  public lname: string = `Suresh`;
  public addCusForm: FormGroup;
  wasFormChanged = false;
    animal: any;
    //dialogRef: any;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog, public dialogRef: MatDialogRef<AddAgentInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      IdProof: null,
      firstname: [this.fname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      lastname: [this.lname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      email: [null, [Validators.required, Validators.email]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.markAsDirty(this.addCusForm);
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

}
