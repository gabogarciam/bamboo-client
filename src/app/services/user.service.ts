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

  // makeFileRequest(url: string, files: Array<File>, name: string) {
  //   const options = {
  //     withCredentials: true
  //   };
  //   return new Promise( (resolve, reject) => {
  //     let formData: any = new FormData();
  //     let xhr = new XMLHttpRequest();

  //     for (let i=0; i<files.length; i++) {
  //       formData.append(name, files[i], files[i].name);
  //     }
  //     xhr.onreadystatechange = function(){
  //       if(xhr.readyState === 4){
  //         if(xhr.status === 200) {
  //           resolve(JSON.parse(xhr.response));
  //         } else {
  //           reject(xhr.response);
  //         }
  //       }
  //     }
  //     xhr.open('POST', url+'/upload-avatar', true);
  //     xhr.setRequestHeader('Autorization', 'true');
  //     xhr.send(formData);
  //   })
  // }

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
