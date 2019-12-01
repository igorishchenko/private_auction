import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddItemService } from 'src/app/shared/core/services/add-item.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);
  item$: any;
  itemId: number = null;

  constructor(
    private itemService: AddItemService,
    private route: ActivatedRoute
  ) {
    this.itemId = this.route.snapshot.params['product-id'];
  }

  ngOnInit() {
    this.item$ = this.getItem();
  }

  getItem(): Observable<any> {
    return this.itemService.getItemById(this.itemId);
  }

  bidItem(item: any): void {
    if (item.price_last_bid) {
      item.price_last_bid *= 1.1;
    } else {
      item.price_last_bid = item.productPrice * 1.1;
    }
    item.price_last_bid = Number(item.price_last_bid.toFixed(2));
    this.itemService.patchItem(item).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(res => res);
    this.itemService.createBid(item.price_last_bid, item.id).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(res => res);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
