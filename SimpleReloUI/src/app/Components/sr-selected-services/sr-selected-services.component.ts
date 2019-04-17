import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sr-selected-services',
  templateUrl: './sr-selected-services.component.html',
  styleUrls: ['./sr-selected-services.component.css']
})
export class SrSelectedServicesComponent implements OnInit {
  panelOpenState = false;
  selectedSrvcList: any [];
  constructor() { }

  deleteSrvc(srvcId:number){    
    const index = this.selectedSrvcList.findIndex(x => x.srvcId === srvcId);
    if (index !== -1) {
        this.selectedSrvcList.splice(index, 1);
    }   
  }

  ngOnInit() {
    this.selectedSrvcList = [
      { srvcId: 1, srvcName:'Shiba Inu', srvcDesc:'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.', noOfPerson:'2', totalRate:'200$'},
      { srvcId: 2, srvcName:'Shiba Inu', srvcDesc:'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.', noOfPerson:'2', totalRate:'200$'}      
    ];
  }

}
