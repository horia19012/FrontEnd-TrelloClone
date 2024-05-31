import { Component, OnInit } from '@angular/core';
import { Project } from '../models/models';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {
  projects: Project[] = [];
  userId: number;

  constructor(private jwtService: JwtService, private router: Router) { 
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? +userIdString : null;
  }

  ngOnInit(): void {
    if (this.userId !== null) {
      this.loadProjects();
    } else {
      console.error('User ID not found in local storage');
    }
  }

  loadProjects(): void {
    this.jwtService.getProjects().subscribe(
      (projects) => {
        this.projects = projects.filter(project => project.owner?.id === this.userId);
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  deleteProject(projectId: number): void {
    this.jwtService.deleteProject(projectId).subscribe(
      () => {
        console.log('Project deleted successfully');
        this.loadProjects(); // Refresh the project list
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
  showTasks(projectId: number): void {
    this.router.navigate(['/tasks', projectId]);
  }

  navigateToCreateTask(projectId: number): void {
    this.router.navigate(['/createTask'], { queryParams: { projectId: projectId } });
  }
}
