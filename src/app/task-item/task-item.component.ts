import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/models';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskTaken = new EventEmitter<Task>();

  takeTask() {
    this.taskTaken.emit(this.task);
  }
}
