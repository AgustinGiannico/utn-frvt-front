import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/location';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class LocationService {
  private apiUrl = `${API_BASE_URL}/location`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: Location): Observable<Location> {
    return this.http.post<Location>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: Location): Observable<Location> {
    return this.http.put<Location>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
