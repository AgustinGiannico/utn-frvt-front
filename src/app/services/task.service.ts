import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class TaskService {
  private apiUrl = `${API_BASE_URL}/task`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
