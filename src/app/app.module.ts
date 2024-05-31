import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';

import { provideHttpClient,HttpClientModule , withFetch} from '@angular/common/http';
import { ProjectItemComponent } from './project-item/project-item.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UsertaskComponent } from './usertask/usertask.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UserProjectsComponent } from './user-projects/user-projects.component';
import { CreateTaskComponent } from './create-task/create-task.component';

@NgModule({
  declarations: [
    AppComponent,
  
    ProjectItemComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    TaskListComponent,
    TaskItemComponent,
    UsertaskComponent,
    CreateProjectComponent,
    UserProjectsComponent,
    CreateTaskComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule  
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }