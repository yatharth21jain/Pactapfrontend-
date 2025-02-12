import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
  termsheading: any;
  
  rescontent: any;
  query: any;
  results: any[] = [];
  isLoading: boolean = false;
  error: string = '';
  selectedLocation: string = '';  // For location filter
  filteredData: any[] = [];  // To hold filtered results
  myForm!: FormGroup;
  loginkey: any ;

  constructor(
    public fb: FormBuilder,
    public uiservice: UiService,
    public router: Router,
    public contentService: ContentService
  ) {
    this.getcontent();
  }
  forminit(): void {
    this.myForm = this.fb.group({
      selecbylocation: [''],
     

    });
    this.loginkey = localStorage.getItem('logindata');

  }

  getcontent() {
    this.contentService.getbanner().subscribe({
      next: (data: any) => {
        this.termsheading = data;
        this.rescontent = this.termsheading;
        console.log('content fetched successfully', this.rescontent);
        this.uiservice.openSnackbar('Content fetched successfully');
      },
      error: (error: any) => {
        // Handle error fetching content
        this.uiservice.openSnackbar('Error fetching content');
      }
    });
  }

  onInput(event: any) {
    this.query = event.target.value;
  }

  // Method to filter data based on location

  onLocationChange(event: any): void {
    this.selectedLocation = event.target.value; 
    // this.rescontent=this.selectedLocation
    console.log('Selected Location:', this.selectedLocation);
    if (this.selectedLocation) {
      this.rescontent = this.termsheading.filter((item: any) =>
        item.location.toLowerCase().startsWith(this.selectedLocation.toLowerCase())
      );
    } else {
      this.rescontent = this.termsheading;
    }
  }
  applyjob(job:any){
    // console.log('Applying for job:', job);
    if(this.loginkey==null){
      this.uiservice.openSnackbar('Please Login to Apply for Job');
    }
    else{
      let appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    appliedJobs.push(job);
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    this.router.navigate(['applyjob']);

    
  
    }
    
  }
  jobdetail(details:any){
    console.log('Job details:', details);
    let jobdetails = localStorage.getItem('jobdetail');
    // appliedJobs.push(job);
    localStorage.setItem('jobdetails', JSON.stringify(details));
    this.router.navigate(['/jobdetail', details.id]);
  }
}
