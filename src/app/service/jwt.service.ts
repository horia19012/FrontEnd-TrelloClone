import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/models';

const BASE_URL = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private http: HttpClient) {}

  register(signRequest: any): Observable<any> {
    return this.http
      .post(BASE_URL + 'users/signup', signRequest, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  login(loginRequest: any): Observable<any> {
    return this.http
      .post(BASE_URL + 'login', loginRequest, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'text', // Change response type to 'text'
      })
      .pipe(catchError(this.handleError));
  }

  getProjects(): Observable<any> {
    return this.http
      .get(BASE_URL + 'api/projects', {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getTasksByProjectId(projectId: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${BASE_URL}api/tasks/project/${projectId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = this.getToken();
    let headers = new HttpHeaders();
    if (jwtToken) {
      console.log('JWT token found in local storage', jwtToken);
      headers = headers.set('Authorization', 'Bearer ' + jwtToken);
    } else {
      console.log('No JWT token found in local storage');
    }
    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Server-side error: Error Code: ${error.status}\nMessage: ${error.message}\nError Body: ${error.error}`;
    }
    console.error('Error during login:', error);
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
