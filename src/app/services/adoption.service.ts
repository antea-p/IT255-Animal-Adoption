import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { Adoption } from '../models/adoption.model';
import { UserService } from './user.service';
import { UserAdoption } from '../models/user-adoption.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/animal.state';
import { addAdoption, deleteAdoption, setAdoptions, updateAdoption } from '../store/adoption.actions';
import { selectAllAdoptions, selectAdoptionById } from '../store/adoption.selectors';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    console.log("adoptionService: loadInitialData called!")
    this.http.get<Adoption[]>(`${this.apiUrl}/adoptions`).pipe(
      tap(adoptions => {
        console.log('Dispatching setAdoptions with:', adoptions); // TODO: privremeno
        this.store.dispatch(setAdoptions({ adoptions }));
      }),
      catchError(error => {
        console.error('Error fetching adoptions', error);
        return throwError(() => new Error('Error fetching adoptions'));
      })
    ).subscribe();
  }

  getAdoptions(): Observable<Adoption[]> {
    return this.store.select(selectAllAdoptions).pipe(
      tap(() => {
        // TODO: privremeno
        console.log(`getAdoptions: selected all adoptions from store`);
      }),
      catchError(error => {
        console.error('Error selecting all adoptions from store', error);
        return throwError(() => new Error('Error selecting all adoptions from store'));
      })
    );
  }

  public createAdoption(adoption: Adoption): Observable<Adoption> {
    return this.http.post<Adoption>(`${this.apiUrl}/adoptions`, adoption).pipe(
      tap(newAdoption => {
        this.store.dispatch(addAdoption({ adoption: newAdoption }));
      }),
      catchError(error => {
        console.error(`Error adding adoption ${adoption}`, error);
        return throwError(() => new Error(`Error adding adoption ${adoption} to store`));
      })
    );
  }

  public updateAdoption(adoption: Adoption): Observable<Adoption> {
    return this.http.put<Adoption>(`${this.apiUrl}/adoptions/${adoption.id}`, adoption).pipe(
      tap(updatedAdoption => {
        this.store.dispatch(updateAdoption({ adoption: updatedAdoption }));
      }),
      catchError(this.handleError)
    );
  }

  public deleteAdoption(id: number): void {
    console.log('Attempting to delete adoption with id:', id);
    this.http.delete(`${this.apiUrl}/adoptions/${id}`).subscribe({
      next: () => {
        console.log('Adoption deleted on server, dispatching deleteAdoption to store:', id);
        this.store.dispatch(deleteAdoption({ id }));
      },
      error: (error) => console.error('Error deleting adoption:', error),
      complete: () => console.log('Adoption deletion completed')
    });
  }

  getAdoptionById(id: number): Observable<Adoption | undefined> {
    return this.store.select(selectAdoptionById(id)).pipe(
      tap(() => {
        // TODO: privremeno
        console.log(`getAdoptionById: selected adoption with id ${id}`);
      }),
      catchError(error => {
        console.error(`Error selecting adoption with ID ${id}`, error);
        return throwError(() => new Error(`Error selecting adoption with ID ${id}from store`));
      })
    )
  }

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


  private linkUserAdoption(adoptionId: number, userId: number) {
    const userAdoption: UserAdoption = { adoptionId, userId };
    console.log(`userAdoption: ${userAdoption.adoptionId, userAdoption.userId}`);
    return this.http.post<UserAdoption>(`${this.apiUrl}/usersAdoptions`, userAdoption);
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