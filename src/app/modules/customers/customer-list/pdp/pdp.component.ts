import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddItemService } from '../../../../shared/core/services/add-item.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from 'src/app/shared/core/services/category.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.scss']
})
export class PdpComponent implements OnInit, OnDestroy {
  currentCategory: any;
  categoryName: Params = null;
  products: Item[] = null;
  private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);
  categoryItems$: any;

  constructor(
    private route: ActivatedRoute,
    private catService: CategoryService,
    private itemService: AddItemService
  ) { 
    this.categoryName = this.route.snapshot.params;
  }

  ngOnInit() {
    this.getCategory();
  }

  getCategory(): void {
    this.catService.getAllCategories().pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(cat => {
      this.currentCategory = cat.filter(res => res.categoryName === this.categoryName['cat-name'])[0];
      this.getCategoryItems();
    });
  }

  getCategoryItems(): void {
    this.itemService.getItemsByCategory(this.currentCategory.id).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(res => this.products = res.products);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
