import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard{
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authService.isAuthenticated()) {
      return true;
    } else {
      this._router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
