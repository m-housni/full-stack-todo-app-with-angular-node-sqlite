import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/v1';
  isAuth = signal(false);

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.API_URL}/auth/login`, { email, password }).pipe(
      map(response => {
        if (response.token) {
          // Store the token in local storage or a service
          localStorage.setItem('token', response.token);
          this.isAuth.set(true);
          this.router.navigate(['/todos']);
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
    this.isAuth.set(false);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
