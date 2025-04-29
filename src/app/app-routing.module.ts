import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './services/auth-guard.service';
import { QuizComponent } from './components/quiz/quiz.component';
import { AddquizComponent } from './components/addquiz/addquiz.component';


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
    path:'quiz',
    component:QuizComponent
  },
  {
    path:'addquiz',
    component:AddquizComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
