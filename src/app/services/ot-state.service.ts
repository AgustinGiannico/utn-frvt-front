import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OtState } from '../interfaces/ot-state';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class OtStateService {
  private apiUrl = `${API_BASE_URL}/ot-state`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<OtState[]> {
    return this.http.get<OtState[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<OtState> {
    return this.http.get<OtState>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: OtState): Observable<OtState> {
    return this.http.post<OtState>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: OtState): Observable<OtState> {
    return this.http.put<OtState>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
