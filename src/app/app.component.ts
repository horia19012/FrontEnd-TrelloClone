import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'trello_clone';

  constructor(public authService: AuthService,private cdr: ChangeDetectorRef,private router: Router) {
  }

  showTasks() {
    const username = localStorage.getItem('username');
    if (username) {
      this.router.navigate([`/tasks/user/${username}`]);
    } else {
      console.log('No user found in local storage');
    }
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }
}
