import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../_services/data.service';
import { UserService } from '../_services';
import { AppSettingsServiceService } from '../shared/app-settings-service.service';

@Component({
  selector: 'app-delete-agent',
  templateUrl: './delete-agent.component.html',
  styleUrls: ['./delete-agent.component.css']
})
export class DeleteAgentComponent 
   {

  constructor(public dialogRef: MatDialogRef < DeleteAgentComponent >,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService, private userService: UserService, private appSettingsService: AppSettingsServiceService,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.id);
  }
  confirmStudentDelete(): void {
    this.userService.deleteEmployeeById(this.data.id);
  }

  deleteEmployee(employeeId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.userService.deleteStudentById(employeeId).subscribe(() => {
        alert('Record Deleted Succefully');
        //this.loadAllEmployees();
        //this.employeeIdUpdate = null;
        //this.employeeForm.reset();

      });
    }
  }  
}
