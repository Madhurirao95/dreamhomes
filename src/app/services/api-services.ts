import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://dreamhomes-api-amcne6h2a3h8fjh7.canadacentral-01.azurewebsites.net';

  constructor(private readonly http: HttpClient) {}

  getAll(api: string, params?: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${api}`, { params });
  }

  getById(api: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${api}/${id}`);
  }

  get(api: string, params?: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${api}`, { params });
  }

  add(api: string, obj: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${api}`, obj);
  }

  update(api: string, id: number, obj: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${api}/${id}`, obj);
  }

  delete(api: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${api}/${id}`);
  }
}
