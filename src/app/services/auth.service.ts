import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from '../../../node_modules/rxjs';
import { Observable } from 'rxjs';

//Heroku
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: any;
  private userChange: Subject<any> = new Subject();

  private baseUrl = environment.apiUrl + 'auth';

  userChange$: Observable<any> = this.userChange.asObservable();

  constructor( private httpClient:HttpClient ) { }

  private setUser(user?: any) {
    console.log('service.setUserA', 'User', user, 'this.user', this.user)
    this.user = user;
    this.userChange.next(user);
    console.log('service.setUserB', 'User', user, 'this.user', this.user)
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

  updateUser(updateData): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.put(`${this.baseUrl}/edit-user`, updateData)
      .toPromise()
      .then((user) => {
        this.setUser(user);
      });
  }

  getUser(): any {
    console.log('Service.getUser', this.user);
    return this.user;
  }

}
