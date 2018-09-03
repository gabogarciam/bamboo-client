import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Subject } from '../../../node_modules/rxjs';
import { Observable } from 'rxjs';

//Heroku
import { environment } from '../../environments/environment';
// import { open } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any;
  private userChange: Subject<any> = new Subject();

  private baseUrl = environment.apiUrl + 'user';
  private baseUrl2 = environment.apiUrl + 'publication';
  private baseUrl3 = environment.apiUrl + 'follow';
  public url: string;

  userChange$: Observable<any> = this.userChange.asObservable();

  constructor( private httpClient:HttpClient  ) { 
    this.url = environment.apiUrl + 'user';
  }

  private setUser(user?: any) {
    this.user = user;
    this.userChange.next(user);
    return user;
  }

  update(updateData): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.put(`${this.baseUrl}/edit`, updateData, options)
      .toPromise()
      .then((user) => {
        this.setUser(user);
      });
  }

  getMePublications(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl2}/get-publication`, options)
    .toPromise();
  }

  getCounter(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/counters-follow`, options)
    .toPromise();
  }

  getCounterId(userId): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/counters-follow/${userId}`, options)
    .toPromise();
  }

  getAvatar(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/get-avatar`, options)
    .toPromise();
  }

  uploadAll(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/upload-avatar`, options)
    .toPromise();
  }

  // updateAvatar(): Promise<any> {
  //   const options = {
  //     withCredentials: true
  //   };
  //   return this.httpClient.post(`${this.baseUrl}/update-avatar`, updateData, options)
  //     .toPromise()
  //     .then((user) => {
  //       this.setUser(user);
  //     });  
  // }

  getUser(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/find`, options)
    .toPromise();
  }

  getUsers(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/list`, options)
    .toPromise();
  }

  getFollowingUser(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl3}/following-users`, options)
    .toPromise();
  }

  getFollowUser(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl3}/followed-users`, options)
    .toPromise();
  }

}
