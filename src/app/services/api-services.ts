import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://localhost:9000';

  constructor (private readonly http: HttpClient) {}

  getAll (api: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${api}`);
  }

  getById (api: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${api}/${id}`);
  }

  add (api: string, obj: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/${api}`, obj);
  }

  update (api: string, id: number, obj: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${api}/${id}`, obj);
  }

  delete (api: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${api}/${id}`);
  }
}
