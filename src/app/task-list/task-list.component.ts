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

  constructor(
    private route: ActivatedRoute,
    private service: JwtService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('projectId'));
      if (this.projectId) {
        this.getTasksByProjectId(this.projectId);
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

  onTaskTaken(task: Task) {
    console.log('Task taken:', task);
    // Implement logic for handling task taking, e.g., updating the task status or reassigning it
  }
}
