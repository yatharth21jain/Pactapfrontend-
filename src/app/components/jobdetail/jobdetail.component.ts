import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.scss']
})
export class JobdetailComponent {
  jobdetail:any
  myForm: any;
  constructor( public fb: FormBuilder,
    public uiservice: UiService,
    public router: Router,
    public contentService: ContentService
  ){
    this.jobdetail = JSON.parse(localStorage.getItem('jobdetails') || '[]');
    console.log('jobdetails Jobs:', this.jobdetail);

  }
  ngOnInit(): void {
    this.forminit()
  }
  forminit(): void {
    this.myForm = this.fb.group({
      name: [''],
      email:[''],
      resume:[''],
      coverletter: [''],
     

    });
    // this.loginkey = localStorage.getItem('logindata');

  }

  applyjob(job:any){
    let appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    appliedJobs.push(job);
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    this.router.navigate(['/applyjob']);


  }
  submit(){
    this.applyjob
    // console.log('Form submitted:', this.myForm.value);
    // let appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    // appliedJobs.push(this.myForm.value);
    // localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    // this.router.navigate(['/applyjob']);
  }
}
