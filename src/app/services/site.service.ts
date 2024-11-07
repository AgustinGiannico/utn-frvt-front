import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../interfaces/site';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class SiteService {
  private apiUrl = `${API_BASE_URL}/site`; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Site[]> {
    return this.http.get<Site[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Site> {
    return this.http.get<Site>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: Site): Observable<Site> {
    return this.http.post<Site>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: Site): Observable<Site> {
    return this.http.put<Site>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
