/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ApiService } from './api-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  constructor (private readonly apiService: ApiService) {}

  generateDescription (data: any): Observable<any> {
    return this.apiService.add('AI/generateDescription', data);
  }
}
