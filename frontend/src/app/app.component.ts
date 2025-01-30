import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first-app';
  isLoggedIn = signal(false);

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if(this.authService.isLoggedIn())
      this.isLoggedIn.set(true);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn.set(false);
  }
}
