import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { UploadImageComponent } from './main/upload-image/upload-image.component';
import { AddItemComponent } from '../../shared/core/add-item/add-item.component';
import { AddItemService } from '../../shared/core/services/add-item.service';
import { SettingsComponent } from './main/settings/settings.component';
import { BidsComponent } from './main/bids/bids.component';
import { YourItemsComponent } from './main/your-items/your-items.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AddItemService],
  declarations: [MainComponent, UploadImageComponent, AddItemComponent, SettingsComponent, BidsComponent, YourItemsComponent]
})
export class MainModule { }
