import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent implements OnInit {
  @Input() size: number = 50;
  @Input() show: boolean;  constructor() { }

  ngOnInit() {
  }

}
