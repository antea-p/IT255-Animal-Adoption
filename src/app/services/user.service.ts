import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, catchError, throwError, tap, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/user.state';
import { setUsers } from '../store/user.actions';
import { selectAllUsers } from '../store/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  redirectUrl: string | null = null;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    console.log("userService: loadInitialData called!")
    this.http.get<User[]>(this.apiUrl).pipe(
      tap(users => {
        console.log('Dispatching setUsers with:', users);
        this.store.dispatch(setUsers({ users }));
      }),
      catchError(error => {
        console.error('Error fetching users', error);
        return throwError(() => new Error('Error fetching users'));
      })
    ).subscribe();
  }

  getUsers(): Observable<User[]> {
    return this.store.select(selectAllUsers).pipe(
      tap(() => {
        // TODO: temporary
        console.log(`getUsers: selected all users from store`);
      }),
      catchError(error => {
        console.error('Error selecting all users from store', error);
        return throwError(() => new Error('Error selecting all users from store'));
      })
    );
  }

  userExists(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => users.length > 0),
      catchError(this.handleError)
    );
  }

  register(user: User) {
    // prvo provjeri postoji li korisnik; 
    // ako da, izbaci grešku, inače registriraj korisnika
    return this.userExists(user.email).pipe(
      switchMap(exists => {
        if (exists) {
          return throwError(() => new Error('User with this email already exists'));
        }
        return this.http.post<User>(this.apiUrl, user);
      }),
      tap(newUser => {
        if (newUser) {
          this.setCurrentUser(newUser);
        }
      }),
      catchError(this.handleError)
    );
  }

  login(user: User) {
    return this.http.get<User[]>(`${this.apiUrl}?email=${user.email}`)
      .pipe(
        map(users => users.find(u => u.email === user.email && u.password === user.password)),
        tap(foundUser => {
          if (foundUser) {
            this.setCurrentUser(foundUser);
          }
        }),
        catchError(this.handleError)
      );
  }


  logout(): void {
    localStorage.removeItem('currentUser');
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) as User : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
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
