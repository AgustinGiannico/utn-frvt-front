import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { API_BASE_URL } from '../app.config';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EnviarDatosService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  enviarFormularioRegistro(data: User): Observable<any> {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
    
    return this.http.post(`${API_BASE_URL}/register`, data, { headers, withCredentials: true });
  }

  enviarFormularioLogin(data: User): Observable<any> {
    return this.http.post(`${API_BASE_URL}/login`, data, { withCredentials: true });
  }
}
