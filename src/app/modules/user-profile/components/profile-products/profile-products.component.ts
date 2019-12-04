import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/core/services/user.service';
import { Observable } from 'rxjs';
import { AddItemService } from 'src/app/shared/core/services/add-item.service';

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.component.html',
  styleUrls: ['./profile-products.component.scss']
})
export class ProfileProductsComponent implements OnInit {
  usersBids: any = null;
  products: any[] = [];
  constructor(
    private userService: UserService,
    private itemService: AddItemService
  ) { }

  ngOnInit() {
    this.getUsersBids();
  }

  getUsersBids(): void {
    if (this.usersBids) {
      return this.usersBids;
    }
    this.userService.getProfile().subscribe(user => {
      this.userService.bitsByUser(user.success.id).subscribe(res => {
        this.usersBids = res;
        res.map(data => {
          this.itemService.getItemById(data.product_id).subscribe(item => {
            this.products.push(item);
          });
        });
      });
    });
  }
}
