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
  email: string | null = ''; // To hold the existing email from localStorage
  imagePreview: string | ArrayBuffer | null = ''; // To hold the image preview URL
  imageError: string = ''; // To store image error message
  resumeError: string = ''; // To store resume error message

  constructor(
    public fb: FormBuilder,
    public uiservice: UiService,
    public router: Router
  ) {
    // Retrieve the stored login data from localStorage
    const storedData = localStorage.getItem('logindata');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.email = parsedData.email; // Store the email to display it and use it for patching
    }
  }

  ngOnInit(): void {
    // Initialize the form
    this.forminit();
    
    // Patch the form with the existing data (if any)
    if (this.email) {
      const storedProfileData = localStorage.getItem('profiledata');
      if (storedProfileData) {
        const profileData = JSON.parse(storedProfileData);
        
        // Assuming profileData contains name, mobile, address, etc.
        this.myForm.patchValue({
          name: profileData.name || '',
          mobile: profileData.mobile || '',
          address: profileData.address || '',
          resume: profileData.resume || ''
        });

        // Load the image preview if it exists in localStorage
        this.imagePreview = profileData.image || ''; // default to empty if no image
      }
    }
  }

  forminit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      address: ['', [Validators.required]],
      resume: ['', [Validators.required]],
      image: ['', [Validators.required]] // This will be set as Base64
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

    // Create the profile data object
    const profileData = {
      email: this.email, // existing email
      name: this.myForm.value.name,
      mobile: this.myForm.value.mobile,
      address: this.myForm.value.address,
      resume: this.myForm.value.resume,
      image: this.imagePreview // Store the image preview URL (Base64 string)
    };

    // Store the updated profile data in localStorage
    localStorage.setItem('profiledata', JSON.stringify(profileData));

    console.log('Profile data updated in localStorage:', profileData);

    // Show success message and navigate (optional)
    this.uiservice.openSnackbar('Profile updated successfully.');
    this.router.navigate(['/']);
  }

  // Handle image file selection and create preview with validation
  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];

    this.imageError = ''; // Reset error message

    if (file) {
      // Validate image type (jpeg/png)
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        this.imageError = 'Only JPEG and PNG images are allowed.';
        return;
      }

      // Validate image size (max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > maxSize) {
        this.imageError = 'Image size should not exceed 2MB.';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        // Set the image preview as the result from the reader (which is a data URL)
        this.imagePreview = reader.result;
        this.myForm.patchValue({ image: reader.result }); // Update the form's image field
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

  // Handle resume file selection with validation
  onResumeSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];

    this.resumeError = ''; // Reset error message

    if (file) {
      // Validate resume type (PDF)
      if (file.type !== 'application/pdf') {
        this.resumeError = 'Only PDF files are allowed for the resume.';
        return;
      }

      this.myForm.patchValue({ resume: file });
    }
  }
}
