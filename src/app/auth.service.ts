import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  isLocalStorageAvailable(): boolean {
    try {
      const test = 'localStorageTest';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  isLoggedIn(): boolean {
    if (this.isLocalStorageAvailable()) {
      return !!localStorage.getItem('jwt');
    }
    return false;
  }

  logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
    }
    this.router.navigate(['/login']);
  }
}
