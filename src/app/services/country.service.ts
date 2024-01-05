import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<string[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data
        // sortiraj alfabetski, ovisno o lokalitetu
        .map(country => country.name.common)
        .sort((a, b) => a.localeCompare(b))
      ),
      catchError(error => {
        console.error('Error fetching countries', error);
        return [];
      })
    );
  }
}
