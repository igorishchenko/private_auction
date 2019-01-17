import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import {BidsComponent} from "./main/bids/bids.component";
import {YourItemsComponent} from "./main/your-items/your-items.component";
import {SettingsComponent} from "./main/settings/settings.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'bids',
        component: BidsComponent
      },
      {
        path: 'youritems',
        component: YourItemsComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
