import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { PdpComponent } from './customer-list/pdp/pdp.component';
import { ProductComponent } from './customer-list/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
  {
    path: ':cat-name',
    component: PdpComponent
  },
  {
    path: ':cat-name/:product-id',
    component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
