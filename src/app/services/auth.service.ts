import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from '../../../node_modules/rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: any;
  private userChange: Subject<any> = new Subject();

  private baseUrl = 'http://localhost:3000/auth';

  userChange$: Observable<any> = this.userChange.asObservable();

  constructor( private httpClient:HttpClient ) { }

  private setUser(user?: any) {
    this.user = user;
    this.userChange.next(user);
    return user;
  }

  me(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/me`, options)
      .toPromise()
      .then((user) => this.setUser(user))
      .catch((err) => {
        if (err.status === 404) {
          this.setUser();
        }
      });
  }

  signup(username: string, password: string) {
    const options = {
      withCredentials: true
    };
    const data = {
      username,
      password
    };
    return this.httpClient.post(`${this.baseUrl}/signup`, data, options)
      .toPromise();
  }

  login(username: string, password: string) {
    const options = {
      withCredentials: true
    };
    const data = {
      username,
      password
    };
    return this.httpClient.post(`${this.baseUrl}/login`, data, options)
      .toPromise();
  }

  logout(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/logout`, {}, options)
      .toPromise()
      .then(() => this.setUser());
  }

  getUser(): any {
    return this.user;
  }

}
