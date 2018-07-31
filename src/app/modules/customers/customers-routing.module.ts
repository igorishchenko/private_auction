import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { PdpComponent } from './customer-list/pdp/pdp.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    children: [
      {
        path: ':id',
        component: PdpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
