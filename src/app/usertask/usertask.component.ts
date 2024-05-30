import { Component, Input } from '@angular/core';
import { Task } from '../models/models';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-usertask',
  templateUrl: './usertask.component.html',
  styleUrl: './usertask.component.css'
})
export class UsertaskComponent {
  @Input() task: Task;


  isEditing: boolean = false;

  constructor(private jwtService: JwtService) {}

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    this.jwtService.updateTask(this.task.id, this.task).subscribe(
      (updatedTask) => {
        this.task = updatedTask;
        this.isEditing = false;
        window.alert('Task updated successfully!');
      },
      (error) => {
        console.error('Error updating task', error);
        window.alert('Failed to update the task.');
      }
    );
  }

  cancelEdit(): void {
    // Optionally reset any changes here if needed
    this.isEditing = false;
  }
}
