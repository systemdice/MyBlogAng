import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

export const DATA = [
  {
    name: 'Some name 1',
    directory: 'http://some.directory1.com',
    subscriptions: [
      {
        type: "Type 1",
        package: [
          {
            name: 'package 1',
            active: true
          },
          {
            name: 'package 2',
            active: true
          }
        ]
      },
      {
        type: "Type 2",
        package: [
          {
            name: 'package 3',
            active: false
          },
          {
            name: 'package 4',
            active: false
          }
        ]
      },
    ]
  },
  {
    name: 'Some name 2',
    directory: 'http://some.directory2.com',
    subscriptions: [
      {
        type: "Type 1",
        package: [
          {
            name: 'package 1',
            active: false
          },
          {
            name: 'package 2',
            active: true
          }
        ]
      },
      {
        type: "Type 2",
        package: [
          {
            name: 'package 3',
            active: false
          },
          {
            name: 'package 4',
            active: true
          }
        ]
      },
    ]
  }
];
export const NEWDATA = {
  name: 'example',
  directory: 'http://some.example.com',
  subscriptions: [
    {
      type: "Type 1",
      package: [
        {
          name: 'package 1',
          active: false
        },
        {
          name: 'package 2',
          active: true
        }
      ]
    },
    {
      type: "Type 2",
      package: [
        {
          name: 'package 3',
          active: false
        },
        {
          name: 'package 4',
          active: true
        }
      ]
    }
  ]
};
export interface iData {
  name: string,
  directory: string,
  package: iPackage[]
};
export interface iPackage {
  type: string,
  packages: boolean
};
@Component({
  selector: 'app-user-setings',
  templateUrl: './user-setings.component.html',
  styleUrls: ['./user-setings.component.css']
})
export class UserSetingsComponent {
  data;
  expanded = [];

  constructor(public toast: MatSnackBar) {
    this.data = DATA;
  }


  toastCreate(data) {
    this.toast.open(`Item created: ${data.name}`, 'close', {
      duration: 4000 // 4 secs
    });
  }

  async addItem() {
    let newData = NEWDATA;
    await this.data.push(newData);
    this.toastCreate(newData);
  }

  delete(item) {
    // Delete by filtering
    this.data = this.data.filter(item => item !== 'x');
  }

  save(item) {
    console.log(item);
  }

}

