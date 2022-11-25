import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../auth/interfaces/interfaces';

import { CharactersResponse, FavoriteFetch,  FavoriteResponse } from '../dashboard/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  
  private baseUrl:string =  environment.baseUrl;

  constructor(private http:HttpClient) { }



  characters(){

    const url = `https://rickandmortyapi.com/api/character`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.get<CharactersResponse>(url, { headers: headers })
      .pipe(
        map(resp=> resp.results),
        catchError(err=> of(err.error))
      );

  }

  addFavorite(favoriteFetch:FavoriteFetch){

    const url = `${this.baseUrl}/favorite`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = favoriteFetch;
    this.http.post(url,body);
    return this.http.post<FavoriteResponse>(url,body,{ headers: headers })
      .pipe(
        map(resp=> resp),
        catchError(err=>of(err.error))
      );
  }


  updateUser(user:User){

    const url = `${this.baseUrl}/auth/user-aditional-info/${user.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = user;
    this.http.post(url,body);
    return this.http.put<User>(url,body,{ headers: headers })
      .pipe(
        map(resp=> resp),
        catchError(err=>of(err.error))
      );
  }

}
