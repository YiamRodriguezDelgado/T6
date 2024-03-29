import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isExpired()) {
      this.router.navigate(['inicio/login']);
      return false;
    }else if(!this.authService.isLoggedIn){
      this.router.navigate(['inicio/login']);
      return false;
    }

    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    const rol = decode(token);
    if (rol['role'] != expectedRole) {
      return false;
    }

    return true;
  }

}
