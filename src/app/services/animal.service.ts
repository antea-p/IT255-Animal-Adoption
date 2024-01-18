import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Animal } from '../models/animal';
import { AppState } from '../store/animal.state';
import { Store } from '@ngrx/store';
import { addAnimal, deleteAnimal, setAnimals, updateAnimal } from '../store/animal.actions';
import { selectAllAnimals, selectAnimalById } from '../store/animal.selectors';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost:3000/animals';

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    console.log("loadInitialData called!")
    this.http.get<Animal[]>(this.apiUrl).pipe(
      tap(animals => {
        console.log('Dispatching setAnimals with:', animals);
        this.store.dispatch(setAnimals({ animals }));
      }),
      catchError(error => {
        console.error('Error fetching animals', error);
        return throwError(() => new Error('Error fetching animals'));
      })
    ).subscribe();
  }

  getAnimals(): Observable<Animal[]> {
    return this.store.select(selectAllAnimals).pipe(
      tap(() => {
        // TODO: temporary
        console.log(`getAnimals: selected all animals from store`);
      }),
      catchError(error => {
        console.error('Error selecting all animals from store', error);
        return throwError(() => new Error('Error selecting all animals from store'));
      })
    );
  }

  getAnimalById(id: number): Observable<Animal | undefined> {
    return this.store.select(selectAnimalById(id)).pipe(
      tap(() => {
        // TODO: temporary
        console.log(`getAnimalById: selected animal with id ${id}`);
      }),
      catchError(error => {
        console.error(`Error selecting animal with ID ${id}`, error);
        return throwError(() => new Error(`Error selecting selecting animal with ID ${id}from store`));
      })
    )
  }

  public createAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, animal).pipe(
      tap(newAnimal => {
        this.store.dispatch(addAnimal({ animal: newAnimal }));
      }),
      catchError(error => {
        console.error(`Error adding animal ${animal}`, error);
        return throwError(() => new Error(`Error adding animal ${animal} to store`));
      })
    );
  }

  public updateAnimal(animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiUrl}/${animal.id}`, animal).pipe(
      tap(updatedAnimal => {
        this.store.dispatch(updateAnimal({ animal: updatedAnimal }));
      }),
      catchError(this.handleError)
    );
  }

  public deleteAnimal(id: number): void {
    console.log('Attempting to delete animal with id:', id);
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        console.log('Animal deleted on server, dispatching deleteAnimal to store:', id);
        this.store.dispatch(deleteAnimal({ id }));
      },
      error: (error) => console.error('Error deleting animal:', error),
      complete: () => console.log('Animal deletion completed')
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side Error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
