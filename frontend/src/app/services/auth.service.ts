import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    // Mock login logic
    if (username === 'user' && password === 'password') {
      this.isAuthenticated = true;
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
