import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwt.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLocalStorageAvailable()){
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    }
    
    this.cdr.detectChanges();

  }

  submitForm() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login successful:', response);
          if (response) {
            console.log('JWT Token:', response); // Print the token
            const jwtToken = response;
            localStorage.setItem('jwt', jwtToken);
            localStorage.setItem('username', this.loginForm.value.username); // Store the username
            this.router.navigateByUrl('/dashboard');
          } else {
            alert('Login failed: No token received.');
          }
        },
        (error) => {
          console.error('Error during login:', error);
          alert('Login failed: Please check your credentials and try again.');
        }
      );
    } else {
      alert('Please fill in both the username and password fields.');
    }
  }
}
