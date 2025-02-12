import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(public http: HttpClient) {}
  getbanner(){
    return this.http.get('https://jsonfakery.com/jobs').pipe(tap((response)=>{
      // console.log(response);
    }))
  }
  search(query: string): Observable<any> {
    const params = new HttpParams().set('q', query); // Passing the search query parameter

    return this.http.get<any>('https://jsonfakery.com/jobs', { params });
  }
}
