import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks/`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    console.log(token)
    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`,
      'Content-Type': 'application/json',
    });
  }


  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task, { headers: this.getHeaders() });
  }

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  getTaskById(taskId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${taskId}`, {
      headers: this.getHeaders(),
    });
  }

  // Cập nhật công việc
  updateTask(taskId: string, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${taskId}`, task, {
      headers: this.getHeaders(),
    });
  }

  // Xóa công việc
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${taskId}`, {
      headers: this.getHeaders(),
    });
  }
  toggleTaskCompletion(taskId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}${taskId}/toggle-completion`, {}, {
      headers: this.getHeaders(),
    });
  }
  
  
}
