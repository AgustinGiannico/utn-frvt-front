import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../interfaces/tag';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class TagService {
  private apiUrl = `${API_BASE_URL}/tag`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
