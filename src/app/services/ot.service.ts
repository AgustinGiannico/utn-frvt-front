import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ot } from '../interfaces/ot';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class OtService {
  private apiUrl = `${API_BASE_URL}/ot`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ot[]> {
    return this.http.get<Ot[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Ot> {
    return this.http.get<Ot>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: Ot): Observable<Ot> {
    return this.http.post<Ot>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: Ot): Observable<Ot> {
    return this.http.put<Ot>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
