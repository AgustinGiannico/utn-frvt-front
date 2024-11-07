import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetType } from '../interfaces/asset-type';
import { API_BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})

export class AssetTypeService {
  private apiUrl = `${API_BASE_URL}/asset-type`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AssetType[]> {
    return this.http.get<AssetType[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: number): Observable<AssetType> {
    return this.http.get<AssetType>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(data: AssetType): Observable<AssetType> {
    return this.http.post<AssetType>(this.apiUrl, data, { withCredentials: true });
  }

  update(id: number, data: AssetType): Observable<AssetType> {
    return this.http.put<AssetType>(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
