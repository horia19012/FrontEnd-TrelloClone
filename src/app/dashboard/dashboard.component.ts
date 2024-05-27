import { Component, OnInit } from '@angular/core';
import { JwtService } from '../service/jwt.service';
import { Project } from '../models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  username: string | null = '';

  constructor(private service: JwtService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username'); // Retrieve the username
    this.printTokenAndGetProjects();
  }

  printTokenAndGetProjects(): void {
    const token = this.service.getToken();
    if (token) {
      console.log('JWT Token:', token);
    } else {
      console.log('No JWT token found');
    }

    this.getProjects();
  }

  getProjects(): void {
    this.service.getProjects().subscribe(
      (data) => {
        this.projects = data;
        console.log('Projects:', this.projects);
      },
      (error) => {
        console.error('There was an error fetching the projects!', error);
      }
    );
  }
}
