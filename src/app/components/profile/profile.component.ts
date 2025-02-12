import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myForm!: FormGroup;
  isLoading: boolean = false;
  email: string | null = ''; 
  imagePreview: string | ArrayBuffer | null = ''; 
  imageError: string = ''; 
  resumeError: string = ''; 

  constructor(
    public fb: FormBuilder,
    public uiservice: UiService,
    public router: Router
  ) {
    const storedData = localStorage.getItem('logindata');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.email = parsedData.email; 
    }
  }

  ngOnInit(): void {
    this.forminit();
    
    if (this.email) {
      const storedProfileData = localStorage.getItem('profiledata');
      if (storedProfileData) {
        const profileData = JSON.parse(storedProfileData);
        
        this.myForm.patchValue({
          name: profileData.name || '',
          mobile: profileData.mobile || '',
          address: profileData.address || '',
          resume: profileData.resume || ''
        });

        this.imagePreview = profileData.image || ''; 
      }
    }
  }

  forminit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      address: ['', [Validators.required]],
      resume: ['', [Validators.required]],
      image: ['', [Validators.required]] 
    });
  }

  submit(): void {
    console.log(this.myForm.value);

    // Check if the form is invalid
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if (this.imageError || this.resumeError) {
      this.uiservice.openSnackbar('Please fix the errors before submitting.');
      return;
    }

    this.isLoading = true;

    const profileData = {
      email: this.email,
      name: this.myForm.value.name,
      mobile: this.myForm.value.mobile,
      address: this.myForm.value.address,
      resume: this.myForm.value.resume,
      image: this.imagePreview 
    };

    localStorage.setItem('profiledata', JSON.stringify(profileData));

    console.log('Profile data updated in localStorage:', profileData);

    this.uiservice.openSnackbar('Profile updated successfully.');
    this.router.navigate(['/']);
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];

    this.imageError = ''; 

    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        this.imageError = 'Only JPEG and PNG images are allowed.';
        return;
      }

      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        this.imageError = 'Image size should not exceed 2MB.';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.myForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file); 
    }
  }

  onResumeSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];

    this.resumeError = ''; 

    if (file) {
      if (file.type !== 'application/pdf') {
        this.resumeError = 'Only PDF files are allowed for the resume.';
        return;
      }

      this.myForm.patchValue({ resume: file });
    }
  }
}
