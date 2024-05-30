import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from '../service/jwt.service';
import { Task } from '../models/models';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  projectId: number | null = null;
  username: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: JwtService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('projectId'));
      this.username = params.get('username');

      if (this.projectId) {
        this.getTasksByProjectId(this.projectId);
      } else if (this.username) {
        this.getTasksByUsername(this.username);
      } else {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          this.getTasksByUsername(storedUsername);
        }
      }
    });
  }

  getTasksByProjectId(projectId: number): void {
    this.service.getTasksByProjectId(projectId).subscribe(
      (data) => {
        this.tasks = data;
        console.log('Tasks:', this.tasks);
      },
      (error) => {
        console.error('There was an error fetching the tasks!', error);
      }
    );
  }

  getTasksByUsername(username: string): void {
    this.service.getTasksByUsername(username).subscribe(
      (data) => {
        this.tasks = data;
        console.log('Tasks:', this.tasks);
      },
      (error) => {
        console.error('There was an error fetching the tasks!', error);
      }
    );
  }
}
