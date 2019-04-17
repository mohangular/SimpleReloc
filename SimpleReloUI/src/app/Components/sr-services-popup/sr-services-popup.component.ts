import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sr-services-popup',
  templateUrl: './sr-services-popup.component.html',
  styleUrls: ['./sr-services-popup.component.css']
})
export class SrServicesPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SrServicesPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

export interface DialogData {
  srvcNoOfPerson: number;  
}
