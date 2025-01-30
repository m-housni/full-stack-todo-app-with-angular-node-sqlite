import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private API_URL = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.API_URL}/auth/login`, { email, password }).pipe(
      map(response => {
        if (response.token) {
          this.isAuthenticated = true;
          // Store the token in local storage or a service
          localStorage.setItem('token', response.token);
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    // Remove token
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
