/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ApiService } from './api-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellPageService {
  constructor (private readonly apiService: ApiService) {}

  postAListing (data: any): Observable<any> {
    return this.apiService.add('Sell/postListing', data);
  }

  getAllListing(): Observable<any> {
    return this.apiService.getAll('Sell/getAllListing');
  }

  getSellerInformationById(id: number): Observable<any> {
    return this.apiService.getById('Sell/getById', id);
  }

  updateAListing(id: number, data: any): Observable<any> {
    return this.apiService.update('Sell/updateListing', id, data);
  }
}
