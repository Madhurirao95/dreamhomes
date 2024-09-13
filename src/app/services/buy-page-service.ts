/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ApiService } from './api-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyPageService {
  constructor(private readonly apiService: ApiService) {}

  getAllListingByCorrdinates(x: number, y: number, pg: number, pgSize: number): Observable<any> {
    const params = {
      coordinatex: x,
      coordinatey: y,
      page: pg,
      pageSize: pgSize
    };
    return this.apiService.getAll('Buy/getAllListingByCoordinates', params);
  }
}
