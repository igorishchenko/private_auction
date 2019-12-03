import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDataComponent } from './components/profile-data/profile-data.component';
import { ProfileLotsComponent } from './components/profile-lots/profile-lots.component';
import { ProfileProductsComponent } from './components/profile-products/profile-products.component';
import { ProfileStatisticsComponent } from './components/profile-statistics/profile-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'data',
        component: ProfileDataComponent
      },
      {
        path: 'lots',
        component: ProfileLotsComponent
      },
      {
        path: 'history-bids',
        component: ProfileProductsComponent
      },
      {
        path: 'statistics',
        component: ProfileStatisticsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
