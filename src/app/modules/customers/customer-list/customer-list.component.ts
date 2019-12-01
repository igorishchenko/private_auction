import { Component, OnInit } from '@angular/core';
import { AddItemService } from '../../../shared/core/services/add-item.service';
import { CategoryService } from 'src/app/shared/core/services/category.service';

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
  categories$: any;

  constructor(
    private itemService: AddItemService,
    private catService: CategoryService
  ) { }

  ngOnInit() {
    this.showPDP = true;

    this.itemService.getAllItems().subscribe(data => {
      this.allItems = data;
    });

    this.categories$ = this.catService.getAllCategories();
  }
}
