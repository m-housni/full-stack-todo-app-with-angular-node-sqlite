import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/todos']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.authService.login(data.email, data.password).subscribe((res) => {
        console.log("res",res);
        if (res) {
          this.router.navigate(['/todos']);
        } else {
          console.log('Invalid login');
        }
      });
    } else {
      console.log('Invalid form');
    }
  }
}
