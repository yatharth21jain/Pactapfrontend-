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

    const registrationData = localStorage.getItem('signupdata');
    if (!registrationData) {
      this.isLoading = false;
      this.uiservice.openSnackbar(`No registration data found.`);
      return;
    }

    const signupDataArray = JSON.parse(registrationData);

    const user = signupDataArray.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem('logindata',`${JSON.stringify(user)}`)
      console.log('Login successful');
      this.uiservice.openSnackbar(`Login successful.`);
      const loginkey = localStorage.setItem('loginkey','True');

      this.router.navigate(['/']);
    } else {
      console.log('Invalid credentials');
      this.uiservice.openSnackbar(`Invalid email or password.`);
    }

    this.isLoading = false;
  }
}
