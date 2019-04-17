import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SrServicesPopupComponent } from './../../sr-services-popup/sr-services-popup.component';

@Component({
  selector: 'app-sr-available-services',
  templateUrl: './sr-available-services.component.html',
  styleUrls: ['./sr-available-services.component.css']
})
export class SrAvailableServicesComponent implements OnInit {
  serviceList: any[];
  result:any[];

  constructor(public dialog: MatDialog) { }

  openDialog(service): void {
    const dialogRef = this.dialog.open(SrServicesPopupComponent, {
      width: '250px',
      data: {name: service.name, desc: service.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.result = result;
    });
  }

  ngOnInit() {
    this.serviceList = [
      { name:'Shiba Inu', desc:'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', imgPath:'https://material.angular.io/assets/img/examples/shiba2.jpg', price:'$200'},
      { name:'Shiba Inu', desc:'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', imgPath:'https://material.angular.io/assets/img/examples/shiba2.jpg', price:'$400'},
      { name:'Shiba Inu', desc:'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', imgPath:'https://material.angular.io/assets/img/examples/shiba2.jpg', price:'$600'},
      { name:'Shiba Inu', desc:'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', imgPath:'https://material.angular.io/assets/img/examples/shiba2.jpg', price:'$800'}
    ];
  }

}
