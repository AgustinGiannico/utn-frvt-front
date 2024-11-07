import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Edifice } from '../interfaces/edifice';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class EdificeService {
  private apiUrl = `${API_BASE_URL}/edifice`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Edifice[]> {
    return this.http.get<Edifice[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Edifice> {
    return this.http.get<Edifice>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: Edifice): Observable<Edifice> {
    return this.http.post<Edifice>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: Edifice): Observable<Edifice> {
    return this.http.put<Edifice>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
