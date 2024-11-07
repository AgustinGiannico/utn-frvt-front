import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Province } from '../interfaces/province';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class PriorityService {
  private apiUrl = `${API_BASE_URL}/priority`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Province[]> {
    return this.http.get<Province[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Province> {
    return this.http.get<Province>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: Province): Observable<Province> {
    return this.http.post<Province>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: Province): Observable<Province> {
    return this.http.put<Province>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
