import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, public authService: AuthService) {}

  showTasks() {
    const username = localStorage.getItem('username');
    if (username) {
      this.router.navigate([`/tasks/user/${username}`]);
    } else {
      console.log('No user found in local storage');
    }
  }
}
