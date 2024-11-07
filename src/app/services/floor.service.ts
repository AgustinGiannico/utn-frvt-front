import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Floor } from '../interfaces/floor';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class FloorService {
  private apiUrl = `${API_BASE_URL}/floor`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Floor[]> {
    return this.http.get<Floor[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Floor> {
    return this.http.get<Floor>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: Floor): Observable<Floor> {
    return this.http.post<Floor>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: Floor): Observable<Floor> {
    return this.http.put<Floor>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
