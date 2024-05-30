import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service'; // Ensure this path is correct

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'trello_clone';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
