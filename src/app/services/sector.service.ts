import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sector } from '../interfaces/sector';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class SectorService {
  private apiUrl = `${API_BASE_URL}/sector`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sector[]> {
    return this.http.get<Sector[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Sector> {
    return this.http.get<Sector>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: Sector): Observable<Sector> {
    return this.http.post<Sector>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: Sector): Observable<Sector> {
    return this.http.put<Sector>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
