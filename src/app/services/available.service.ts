import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Available } from '../interfaces/available';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class AddressService {
  private apiUrl = `${API_BASE_URL}/asset-type`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Available[]> {
    return this.http.get<Available[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Available> {
    return this.http.get<Available>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: Available): Observable<Available> {
    return this.http.post<Available>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: Available): Observable<Available> {
    return this.http.put<Available>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
