import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Animal } from '../models/animal';
import { Adoption } from '../models/adoption.model';
import { UserService } from './user.service';
import { UserAdoption } from '../models/user-adoption.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private userService: UserService) { }

  submitAdoption(adoption: Adoption): Observable<UserAdoption> {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not logged in');
    }

    return this.http.post<Adoption>(`${this.apiUrl}/adoptions`, adoption).pipe(
      tap((newAdoption: Adoption) => console.log(`adoptionId: ${newAdoption.id}`)),
      switchMap((newAdoption: Adoption) => this.linkUserAdoption(newAdoption.id, currentUser.id))
    );
  }


  linkUserAdoption(adoptionId: number, userId: number) {
    const userAdoption: UserAdoption = { adoptionId, userId };
    console.log(`userAdoption: ${userAdoption.adoptionId, userAdoption.userId}`);
    return this.http.post<UserAdoption>(`${this.apiUrl}/usersAdoptions`, userAdoption);
  }
}