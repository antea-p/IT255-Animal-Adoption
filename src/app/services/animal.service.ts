import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost:3000/animals';

  constructor(private http: HttpClient) { }

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching animals', error);
        return throwError(() => new Error('Error fetching animals'));
      })
    );
  }

  getAnimalById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching animal with ID ${id}`, error);
        return throwError(() => new Error(`Error fetching animal with ID ${id}`));
      })
    );
  }

}
