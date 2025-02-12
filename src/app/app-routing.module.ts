import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { ApplyjobComponent } from './components/applyjob/applyjob.component';
import { JobdetailComponent } from './components/jobdetail/jobdetail.component';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'',
    component:IndexComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'job-list',
    component:JobListComponent
  },
  {
    path:'applyjob',
    component:ApplyjobComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'jobdetail/:id',
    component:JobdetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
