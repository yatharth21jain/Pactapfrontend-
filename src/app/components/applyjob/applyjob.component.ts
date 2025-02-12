import { Component } from '@angular/core';

@Component({
  selector: 'app-applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.scss']
})
export class ApplyjobComponent {
  appliedJobs:any
  constructor(){
    this.appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    console.log('Applied Jobs:', this.appliedJobs);
  }

}
