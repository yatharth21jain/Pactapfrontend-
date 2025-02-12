import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loginkey:any
  constructor(){
     this.loginkey = localStorage.getItem('loginkey');

  }
  Logout(){
    localStorage.removeItem('loginkey');
    localStorage.removeItem('logindata');
    // localStorage.removeItem('logindata');
    this.loginkey = null;

    // console.log('Logged Out');
  }

}
