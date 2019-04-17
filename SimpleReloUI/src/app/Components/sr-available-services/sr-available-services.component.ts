import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sr-available-services',
  templateUrl: './sr-available-services.component.html',
  styleUrls: ['./sr-available-services.component.css']
})
export class SrAvailableServicesComponent implements OnInit {
  serviceList: any[];

  constructor() { }

  ngOnInit() {
    this.serviceList = [
      { name:'Shiba Inu', desc:'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', imgPath:'https://material.angular.io/assets/img/examples/shiba2.jpg'},
      { name:'Shiba Inu', desc:'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', imgPath:'https://material.angular.io/assets/img/examples/shiba2.jpg'},
      { name:'Shiba Inu', desc:'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', imgPath:'https://material.angular.io/assets/img/examples/shiba2.jpg'},
      { name:'Shiba Inu', desc:'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', imgPath:'https://material.angular.io/assets/img/examples/shiba2.jpg'}
    ];
  }

}
