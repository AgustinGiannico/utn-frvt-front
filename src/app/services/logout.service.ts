// auth/logout.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private apiUrl = `${API_BASE_URL}/logout`;

  constructor(private http: HttpClient) { }

  logout(): Observable<any> {
    return this.http.post(this.apiUrl, {}, { withCredentials: true });
  }
}
