/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ApiService } from './api-services';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly isAuthorizedSubject = new BehaviorSubject<boolean>(
    this.getIsAuthorized()
  );

  isAuthorized$ = this.isAuthorizedSubject.asObservable();
  constructor(private readonly apiService: ApiService) {}

  getIsAuthorized(): boolean {
    const storedItem = localStorage.getItem('isAuthorized');
    return storedItem !== null ? JSON.parse(storedItem) : false;
  }

  setIsAuthorized(val: boolean): void {
    localStorage.setItem('isAuthorized', JSON.stringify(val));
    this.isAuthorizedSubject.next(val);
  }

  getAuthToken(): string {
    const authToken = localStorage.getItem('token');
    if (authToken !== null && authToken !== undefined) {
      return authToken;
    }

    return '';
  }

  setAuthToken(val: any): void {
    localStorage.setItem('token', val.result);
  }

  getEmail(): string {
    const email = localStorage.getItem('email');
    return email !== null ? email : '';
  }

  setEmail(val: string): void {
    localStorage.setItem('email', val);
  }

  signOut(): void {
    this.setAuthToken('');
    this.setIsAuthorized(false);
    this.setEmail('');
  }

  createAccountForUser(info: any): Observable<any> {
    return this.apiService.add('Authentication/createAccount/user', info);
  }

  createAccountForAgent(info: any): Observable<any> {
    return this.apiService.add('Authentication/createAccount/agent', info);
  }

  signIn(info: any): Observable<any> {
    return this.apiService.add('Authentication/signIn', info);
  }

  isAgent(email: string): Observable<any> {
    return this.apiService.get('Authentication/isAgent', { email });
  }
}
