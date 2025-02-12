import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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
      name:['',[Validators.required]],
     
      confirmPassword:['',[Validators.required]],

    });
  }
  submit(){
    console.log(this.myForm.value);
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const existingData = localStorage.getItem('signupdata');
    let signupDataArray = [];
  
    if (existingData) {
      signupDataArray = JSON.parse(existingData);
    }
  
    signupDataArray.push(this.myForm.value);
  
    localStorage.setItem('signupdata', JSON.stringify(signupDataArray));
  
    console.log('Data saved to localStorage:', signupDataArray);
  
    this.isLoading = false;
    this.uiservice.openSnackbar(`Register Successfully. `)
    this.router.navigate(['/login'])


  }
}
