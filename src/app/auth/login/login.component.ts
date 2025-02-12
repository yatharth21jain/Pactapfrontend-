import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  myForm!: FormGroup;
  isLoading: boolean = false;


  constructor( public fb:FormBuilder,public uiservice:UiService,public router:Router){

  }
  ngOnInit(): void {
    this.forminit()
  }
  forminit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
     

    });
  }
  submit(){
    console.log(this.myForm.value);
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.myForm.value;
    this.isLoading = true;

    // Retrieve registration data from localStorage
    const registrationData = localStorage.getItem('signupdata');
    if (!registrationData) {
      this.isLoading = false;
      this.uiservice.openSnackbar(`No registration data found.`);
      return;
    }

    // Parse the registration data (array of registered users)
    const signupDataArray = JSON.parse(registrationData);

    // Check if the email and password match any entry in the registration data
    const user = signupDataArray.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem('logindata',`${JSON.stringify(user)}`)
      // Login success
      console.log('Login successful');
      this.uiservice.openSnackbar(`Login successful.`);
      const loginkey = localStorage.setItem('loginkey','True');

      this.router.navigate(['/']);
    } else {
      // Login failed (invalid credentials)
      console.log('Invalid credentials');
      this.uiservice.openSnackbar(`Invalid email or password.`);
    }

    this.isLoading = false;
  }
}
