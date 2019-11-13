import { Component, OnInit } from '@angular/core';
import { AddItemService } from '../../../shared/core/services/add-item.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  public allItems: any;
  public showPDP: boolean = true;
  public path = new RegExp('.*?customers\/[0-9]+');
  public showProducts = this.path.test(document.URL);

  constructor(private itemService: AddItemService) { }

  ngOnInit() {
    this.showPDP = true;

    this.itemService.getAllItems().subscribe(data => {
      this.allItems = data;
    });
  }

  matchUrl(id: number): boolean {
    if (typeof id === 'number') {
      this.showPDP = false;
    }
    return this.showPDP;
  }

}
