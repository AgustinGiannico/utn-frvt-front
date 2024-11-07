import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../interfaces/address';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class AddressService {
  private apiUrl = `${API_BASE_URL}/address`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: Address): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
