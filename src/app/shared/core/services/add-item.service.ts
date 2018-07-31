import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Item } from '../../models/item';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {

  delayMs = 1000;
  newItem = [];

  constructor(private http: HttpClient) { }

  //post request to add and save item
  saveItem(item: Item){
    this.newItem.push(item);
    return this.http.post('http://localhost:8080/api/addItem', item);
  }
  //get request to get all items
  getAllItems() {
    return this.http.get('http://localhost:8080/api/products');
  }

}
