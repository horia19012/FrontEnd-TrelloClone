import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AuthGuard } from './auth.guard';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UserProjectsComponent } from './user-projects/user-projects.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'tasks/:projectId', component: TaskListComponent },
  { path: 'tasks/user/:username', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'user-projects', component: UserProjectsComponent, canActivate: [AuthGuard] },
  { path: 'createProject', component: CreateProjectComponent, canActivate: [AuthGuard] },
  { path: 'createTask', component: CreateTaskComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
