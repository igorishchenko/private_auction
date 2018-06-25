import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { UploadImageComponent } from './main/upload-image/upload-image.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
  declarations: [MainComponent, UploadImageComponent]
})
export class MainModule { }
