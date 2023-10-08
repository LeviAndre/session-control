import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionTimerGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const timeoutDuration = 600000; // 10 minutos em milissegundos (10 * 60 * 1000)

    if (this._authService.isAuthenticated()) {
      const lastActivityTime = this._authService.getLastActivityTime();
      const currentTime = Date.now();

      if (currentTime - lastActivityTime < timeoutDuration) {
        this._authService.updateLastActivityTime();
        return true;
      } else {
        this._authService.logout();
        this._router.navigate(['/']);
        return false;
      }
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
