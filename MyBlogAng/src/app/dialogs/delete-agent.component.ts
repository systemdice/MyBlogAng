import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-delete-agent',
  templateUrl: './delete-agent.component.html',
  styleUrls: ['./delete-agent.component.css']
})
export class DeleteAgentComponent 
   {

  constructor(public dialogRef: MatDialogRef < DeleteAgentComponent >,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.id);
  }
}
