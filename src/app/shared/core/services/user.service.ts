import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    // return this.http.get<User[]>('http://vis.net.ua/vis-auction/public/oauth/clients');
  }

  getProfile(userData): any {
    const httpOptions = {headers: new HttpHeaders({
      Accept: 'application/json',
      Authorization: `${userData.token_type} ${userData.token}`
    })};
    // const formattedUserData = {
    //   Accept: 'application/json',
    //   Authorization: `${userData.token_type} ${userData.token}`
    // };
    // headers = headers.append('Accept', formattedUserData.Accept);
    // headers = headers.append('Authorization', formattedUserData.Authorization);
    return this.http.post<any>('http://vis.net.ua/vis-auction/public/api/profile', '', httpOptions);
  }

  create(user: User) {
    return this.http.post<User[]>('http://vis.net.ua/vis-auction/public/api/register', user);
  }

  delete(id: number) {
    return this.http.delete('http://vis.net.ua/vis-auction/public/oauth/clients/' + id);
  }

  update(user: User) {
    return this.http.put<User[]>('http://vis.net.ua/vis-auction/public/oauth/clients/' + user._id, user);
  }
}
