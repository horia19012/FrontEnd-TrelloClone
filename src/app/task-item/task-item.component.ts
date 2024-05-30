import { Component, Input } from '@angular/core';
import { Task, User } from '../models/models'; // Ensure Task and User models are correctly imported
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: Task;

  constructor(private jwtService: JwtService) {}

  takeTask() {
    const username = localStorage.getItem('username');
    if (username) {
      this.jwtService.getUserByUsername(username).subscribe(
        (user: User) => {
          if (user) {
            // Create a new task object with the updated assigned user
            const updatedTask: Task = { ...this.task, assignedToUser: user };

            this.jwtService.updateTask(this.task.id, updatedTask).subscribe(
              response => {
                this.task.assignedToUser = response.assignedToUser;
                console.log('Task updated successfully', response);
                window.alert('Task has been taken successfully!');
              },
              error => {
                console.error('Error updating task', error);
                window.alert('Failed to take the task.');
              }
            );
          } else {
            console.error('User not found');
            window.alert('User not found.');
          }
        },
        error => {
          console.error('Error fetching user', error);
          window.alert('Error fetching user.');
        }
      );
    } else {
      console.log('No user found in local storage');
      window.alert('No user found in local storage.');
    }
  }
}
