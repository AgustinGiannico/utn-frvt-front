import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskListOt } from '../interfaces/task-list-ot';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class TaskListOtService {
  private apiUrl = `${API_BASE_URL}/task-list`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TaskListOt[]> {
    return this.http.get<TaskListOt[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<TaskListOt> {
    return this.http.get<TaskListOt>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: TaskListOt): Observable<TaskListOt> {
    return this.http.post<TaskListOt>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: TaskListOt): Observable<TaskListOt> {
    return this.http.put<TaskListOt>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
