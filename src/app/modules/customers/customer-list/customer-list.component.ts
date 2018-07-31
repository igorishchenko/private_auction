import { Component, OnInit } from '@angular/core';
import { AddItemService } from '../../../shared/core/services/add-item.service';
import { Observable } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private itemService: AddItemService) { }

  allItems: any;

  showPDP = true;
  path = new RegExp('.*?customers\/[0-9]+');
  showProducts = this.path.test(document.URL);

  ngOnInit() {
    this.showPDP = true;

    this.itemService.getAllItems().subscribe(data => {
      this.allItems = data;
    });    
  }
  
  matchUrl(id): boolean {
    if (typeof id === 'number')
    this.showPDP = false;
    return this.showPDP;
  }

}
