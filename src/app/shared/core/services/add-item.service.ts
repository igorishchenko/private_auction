import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Item, SaveItem } from '../../models/item';
import {Observable} from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {
  public newItem: Array<SaveItem> = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  //post request to add and save item
  saveItem(item: SaveItem): Observable<any> {
    this.newItem.push(item);
    return this.http.post('http://vis.net.ua/vis-auction/public/api/products', item);
  }

  //get request to get all items
  getAllItems(): Observable<any> {
    return this.http.get('http://vis.net.ua/vis-auction/public/api/products');
  }

  getItemById(itemId: number): Observable<any> {
    return this.http.get('http://vis.net.ua/vis-auction/public/api/products/' + itemId);
  }

  patchItem(item: any): Observable<any> {
    return this.http.put('http://vis.net.ua/vis-auction/public/api/products/' + item.id, item, this.authService.getHttpOptions());
  }

  createBid(last_bid: number, product_id: number): Observable<any> {
    return this.http.post('http://vis.net.ua/vis-auction/public/api/products/' + product_id + '/bet', {price_last_bid: last_bid}, this.authService.getHttpOptions());
  }

  getItemsByCategory(catId: number): Observable<any> {
    return this.http.get('http://vis.net.ua/vis-auction/public/api/categories/' + catId);
  }
}
