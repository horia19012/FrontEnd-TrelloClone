import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, Project } from '../models/models'; // Ensure the path is correct
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  createTaskForm: FormGroup;
  projectId: number;

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createTaskForm = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.queryParamMap.get('projectId');
  }

  onSubmit(): void {
    if (this.createTaskForm.valid) {
      const taskData: Task = {
        id: 0, // Backend should generate the ID
        taskName: this.createTaskForm.value.taskName,
        taskDescription: this.createTaskForm.value.taskDescription,
        deadline: this.createTaskForm.value.deadline,
        priority: this.createTaskForm.value.priority,
        status: this.createTaskForm.value.status,
        assignedToUser: null, // No user assigned initially
        project: { id: this.projectId } as Project // Set project ID
      };

      this.jwtService.createTask(taskData).subscribe(
        (response) => {
          console.log('Task created successfully:', response);
          this.router.navigate(['/tasks', this.projectId]); // Navigate to the tasks page after successful creation
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }
}
