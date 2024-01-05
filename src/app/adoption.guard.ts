import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdoptionService } from './services/adoption.service';

@Injectable({
  providedIn: 'root'
})
export class AdoptionGuard implements CanActivate {
  constructor(private adoptionService: AdoptionService, private router: Router) { }

  canActivate(): boolean {
    if (this.adoptionService.adoptedAnimal) {
      return true;
    } else {
      console.log("Didn't detect adopted animal!");
      this.router.navigate(['/home']);
      return false;
    }
  }
}
