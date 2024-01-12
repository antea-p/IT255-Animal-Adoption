import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Animal } from '../models/animal';
import { AppState } from '../store/animal.state';
import { Store } from '@ngrx/store';
import { setAnimals } from '../store/animal.actions';
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
    // return this.http.get<Animal>(`${this.apiUrl}/${id}`).pipe(
    //   catchError(error => {
    //     console.error(`Error fetching animal with ID ${id}`, error);
    //     return throwError(() => new Error(`Error fetching animal with ID ${id}`));
    //   })
    // );
  }

}
