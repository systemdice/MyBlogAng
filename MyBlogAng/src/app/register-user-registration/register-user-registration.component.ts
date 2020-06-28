//app.component.ts
import { Component, ViewChild } from '@angular/core';

import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

export interface UsersData {
  name: string;
  id: number;
  imageUrl: string;
}

const ELEMENT_DATA: UsersData[] = [
  { id: 1560608769632, name: 'Artificial Intelligence', imageUrl: '../../../assets/images/Liku1.png' },
  { id: 1560608796014, name: 'Machine Learning', imageUrl: 'https://github.com/SiddAjmera.png' },
  { id: 1560608787815, name: 'Robotic Process Automation', imageUrl: '../../../assets/images/Jhia1.jpg' },
  { id: 1560608805101, name: 'Blockchain', imageUrl: '../../../assets/images/logo.png' }
];
@Component({
  selector: 'app-register-user-registration',
  templateUrl: './register-user-registration.component.html',
  styleUrls: ['./register-user-registration.component.css']
})
export class RegisterUserRegistrationComponent {
  displayedColumns: string[] = ['id', 'name', 'imageUrl', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) { }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      height:'300px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj) {
    var d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: row_obj.name,
      imageUrl: row_obj.imageUrl
    });
    this.table.renderRows();

  }
  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }


}
