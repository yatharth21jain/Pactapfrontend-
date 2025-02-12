import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const user = localStorage.getItem('logindata'); // You can also check other conditions (e.g., a token in localStorage)

      if (user) {
        // If user is logged in, allow access to the route
        return true;
      } else {
        // If user is not logged in, redirect to the login page
        this.router.navigate(['/login']);
        return false;
      }
  }
}
