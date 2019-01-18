import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('http://localhost:8080/api/users');
  }

  getById(id: number) {
    return this.http.get('http://localhost:8080/api/users/' + id);
  }

  create(user: User) {
    return this.http.post('http://localhost:8080/setup', user);
  }

  delete(id: number) {
    return this.http.delete('http://localhost:8080/api/users/' + id);
  }
  // User settings
  update(user: User) {
    return this.http.put('http://localhost:8080/api/users/' + user._id, user);
  }
}
