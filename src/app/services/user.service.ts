import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, catchError, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  redirectUrl: string | null = null;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post<User>(this.apiUrl, user)
      .pipe(
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
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


}
