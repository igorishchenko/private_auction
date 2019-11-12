import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item, SaveItem } from '../../models/item';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddItemService {
  public newItem: Array<SaveItem> = [];

  constructor(private http: HttpClient) { }

  //post request to add and save item
  saveItem(item: SaveItem): Observable<any> {
    this.newItem.push(item);
    return this.http.post('http://vis.net.ua/vis-auction/public/api/products', item);
  }

  //get request to get all items
  getAllItems(): Observable<any> {
    return this.http.get('http://vis.net.ua/vis-auction/public/api/products');
  }

}
