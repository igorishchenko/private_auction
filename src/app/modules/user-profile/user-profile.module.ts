import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDataComponent } from './components/profile-data/profile-data.component';
import { ProfileProductsComponent } from './components/profile-products/profile-products.component';
import { ProfileStatisticsComponent } from './components/profile-statistics/profile-statistics.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileLotsComponent } from './components/profile-lots/profile-lots.component';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfileComponent,
    ProfileDataComponent,
    ProfileProductsComponent,
    ProfileStatisticsComponent,
    ProfileSettingsComponent,
    ProfileLotsComponent
  ]
})
export class UserProfileModule { }
