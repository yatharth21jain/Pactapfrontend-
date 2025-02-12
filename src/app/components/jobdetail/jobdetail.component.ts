import { Component } from '@angular/core';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.scss']
})
export class JobdetailComponent {
  jobdetail:any
  constructor(){
    this.jobdetail = JSON.parse(localStorage.getItem('jobdetails') || '[]');
    console.log('jobdetails Jobs:', this.jobdetail);

  }

}
