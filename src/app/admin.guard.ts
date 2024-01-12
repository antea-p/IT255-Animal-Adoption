import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser && currentUser.isAdmin) {
      console.log("user is admin!")
      return true;
    }
    console.log("user is NOT admin!")
    this.router.navigate(['/home']);
    return false;
  }
}
