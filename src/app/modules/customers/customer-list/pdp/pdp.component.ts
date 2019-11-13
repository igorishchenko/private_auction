import { Component, OnInit } from '@angular/core';
import { AddItemService } from '../../../../shared/core/services/add-item.service';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.scss']
})
export class PdpComponent implements OnInit {

  item: any;
  currentProduct: any;

  constructor(private itemService: AddItemService) { }

  ngOnInit() {
    this.itemService.getAllItems().subscribe(data => {
      this.item = data;
      for (const res in this.item) {
        if (this.item.hasOwnProperty(res)) {
          const element = this.item[res];
          if (document.URL.replace(/.*?customers\/(.*?)/g,"$1") == element.id) {
            this.currentProduct = {...element};
            JSON.stringify(this.currentProduct);
          }
        }
      }
    }); 
  }

}
