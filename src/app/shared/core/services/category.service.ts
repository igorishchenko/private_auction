import { Injectable } from '@angular/core';
import { Category, CreateCategory } from '../../models/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://vis.net.ua/vis-auction/public/api/categories');
  }

  createCategory(catData: CreateCategory): Observable<Category> {
    return this.http.post<Category>('http://vis.net.ua/vis-auction/public/api/http://vis.net.ua/vis-auction/public/api/profile', catData);
  }
}