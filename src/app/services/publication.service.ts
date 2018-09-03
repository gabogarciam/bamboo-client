import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from '../../../node_modules/rxjs';
import { Observable } from 'rxjs';

//Heroku
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {
    private userChange: Subject<any> = new Subject();
    userChange$: Observable<any> = this.userChange.asObservable();

    private baseUrl = environment.apiUrl + 'publication';
    
    public url: string;

    constructor( private httpClient:HttpClient ) {
        this.url = environment.apiUrl + 'user';
    }

    addPublication() {
        const options = {
            withCredentials: true
          };
          return this.httpClient.get(`${this.baseUrl}/save-publication`, options)
          .toPromise();
    }
}