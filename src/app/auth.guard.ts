import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.userService.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  }

}