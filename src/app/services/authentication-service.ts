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

  private readonly agentStatusSubject = new BehaviorSubject<boolean>(
    this.getIsAgent()
  );

  agentStatus$ = this.agentStatusSubject.asObservable();

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
    localStorage.setItem('token', val);
  }

  getEmail(): string {
    const email = localStorage.getItem('email');
    return email !== null ? email : '';
  }

  setEmail(val: string): void {
    localStorage.setItem('email', val);
  }

  getIsAgent(): boolean {
    const storedItem = localStorage.getItem('isAgent');
    return storedItem !== null ? JSON.parse(storedItem) : false;
  }

  setIsAgent(val: boolean): void {
    localStorage.setItem('isAgent', JSON.stringify(val));
    this.agentStatusSubject.next(val);
  }

  signOut(): void {
    this.setAuthToken('');
    this.setIsAuthorized(false);
    this.setIsAgent(false);
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

  resetPassword(info: any): Observable<any> {
    return this.apiService.add('Authentication/resetPassword', info);
  }

  isAgent(email: string): Observable<any> {
    return this.apiService.get('Authentication/isAgent', { email });
  }

  isAnExistingUser(email: string): Observable<any> {
    return this.apiService.get('Authentication/isExistingUser', { email });
  }
}
