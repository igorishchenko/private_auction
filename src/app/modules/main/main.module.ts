import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { UploadImageComponent } from './main/upload-image/upload-image.component';
import { AddItemComponent } from '../../shared/core/add-item/add-item.component';
import { AddItemService } from '../../shared/core/services/add-item.service';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AddItemService],
  declarations: [MainComponent, UploadImageComponent, AddItemComponent]
})
export class MainModule { }
