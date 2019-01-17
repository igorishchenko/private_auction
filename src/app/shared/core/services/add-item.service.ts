import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from '../../models/item';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddItemService {
  public newItem: Array<Item> = [];

  constructor(private http: HttpClient) { }

  //post request to add and save item
  saveItem(item: Item): Observable<any> {
    this.newItem.push(item);
    return this.http.post('http://localhost:8080/api/addItem', item);
  }

  //get request to get all items
  getAllItems(): Observable<any> {
    return this.http.get('http://localhost:8080/api/products');
  }

}
