import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemService } from '../../shared/core/services/add-item.service';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { PdpComponent } from './customer-list/pdp/pdp.component';
import { ProductComponent } from './customer-list/product/product.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
  ],
  providers: [AddItemService],
  declarations: [CustomerListComponent, PdpComponent, ProductComponent]
})
export class CustomersModule { }
