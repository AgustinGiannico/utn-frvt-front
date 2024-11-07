import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Priority } from '../interfaces/priority';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class PriorityService {
  private apiUrl = `${API_BASE_URL}/priority`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Priority[]> {
    return this.http.get<Priority[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Priority> {
    return this.http.get<Priority>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: Priority): Observable<Priority> {
    return this.http.post<Priority>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: Priority): Observable<Priority> {
    return this.http.put<Priority>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
