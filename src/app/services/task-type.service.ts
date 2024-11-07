import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskType } from '../interfaces/task-type';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class TaskTypeService {
  private apiUrl = `${API_BASE_URL}/task-type`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TaskType[]> {
    return this.http.get<TaskType[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<TaskType> {
    return this.http.get<TaskType>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: TaskType): Observable<TaskType> {
    return this.http.post<TaskType>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: TaskType): Observable<TaskType> {
    return this.http.put<TaskType>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
