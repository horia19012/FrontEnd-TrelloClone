import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Project } from '../models/models'; // Adjust import path as necessary

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  @Input() project: Project = {
    id: 0, // default id
    projectName: '',
    projectDescription: '',
    deadline: '',
    status: '',
    owner: { id: 0, username: '', fullName: '', email: '' } // assuming owner is mandatory
  };
  

  ngOnInit(): void {
    //console.log(this.project);
  }

  showTasks(): void {
    //console.log('Showing tasks for project:', this.project.projectName);
    // Implement task display logic here
  }

}
