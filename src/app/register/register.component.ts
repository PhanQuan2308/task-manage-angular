import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';
import { AuthService } from './../../services/authService/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    // Reset error and success messages
    this.errorMessage = '';
    this.successMessage = '';
  
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.successMessage = 'Đăng ký thành công! Bạn có thể đăng nhập.';
        // Đặt lại các trường input sau khi đăng ký thành công
        this.username = '';
        this.password = '';
        setTimeout(() => {
          this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
        }, 1500);
      },
      error: (error) => {
        console.error('Registration failed', error);
        if (error.status === 400) {
          this.errorMessage = 'Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.';
        } else {
          this.errorMessage = 'Đăng ký thất bại. Vui lòng thử lại.';
        }
      },
    });
  }
  
}