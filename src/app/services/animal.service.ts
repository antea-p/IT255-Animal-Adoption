import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost:3000/animals';

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }
}
