import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/models'; // Import User model
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  createProjectForm: FormGroup;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.createProjectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
      deadline: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      console.log(+userId);
      this.jwtService.getUserById(+userId).subscribe(
        (user) => {
          this.currentUser = user;
        },
        (error) => {
          console.error('Error fetching user details:', error);
          // Handle error appropriately
        }
      );
    }
  }

  onSubmit(): void {
    if (this.createProjectForm.valid && this.currentUser) {
      const projectData = {
        ...this.createProjectForm.value,
        owner: this.currentUser
      };

      this.jwtService.createProject(projectData).subscribe(
        (response) => {
          console.log('Project created successfully:', response);
          this.router.navigate(['/user-projects']); // Navigate to the projects page after successful creation
        },
        (error) => {
          console.error('Error creating project:', error);
          // Handle error appropriately
        }
      );
    } else {
      // Handle form invalid or user not found
    }
  }
}
