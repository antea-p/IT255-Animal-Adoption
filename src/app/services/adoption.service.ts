import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal';
import { Adoption } from '../models/adoption.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private apiUrl = 'http://localhost:3000/adoptions';
  public adoptedAnimal: Animal | null = null;

  constructor(private http: HttpClient, private userService: UserService) { }

  submitAdoption(adoptionData: Adoption): Observable<Adoption> {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not logged in');
    }

    // const adoptionWithUser: Adoption = { ...adoptionData, userId: 1 }; // TODO: get user's Id
    console.log(`adoptionData: ${adoptionData}`);
    return this.http.post<Adoption>(`${this.apiUrl}`, adoptionData);
  }

}