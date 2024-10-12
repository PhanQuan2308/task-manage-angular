// src/app/auth/login.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response && response.access_token) {
          this.authService.setToken(response.access_token); // Lưu token vào localStorage
          console.log('Login successful');
          this.router.navigate(['/task']); // Điều hướng đến trang chính sau khi đăng nhập thành công
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.';
      },
    });
  }
}