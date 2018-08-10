import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Subject } from '../../../node_modules/rxjs';
import { Observable } from 'rxjs';

//Heroku
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any;
  private userChange: Subject<any> = new Subject();

  private baseUrl = environment.apiUrl + 'user';
  private baseUrl2 = environment.apiUrl + 'publication';

  userChange$: Observable<any> = this.userChange.asObservable();

  constructor( private httpClient:HttpClient  ) { }

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
}
