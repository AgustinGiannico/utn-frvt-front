import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private apiUrl = `${API_BASE_URL}/user`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
