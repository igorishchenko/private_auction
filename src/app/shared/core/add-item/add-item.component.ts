import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item, SaveItem } from '../../models/item';
import { AddItemService } from '../services/add-item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  public addItemForm: FormGroup;
  public currentUser = JSON.parse(localStorage.getItem('currentUser'));
  public productId: string;
  public addItemTrue: boolean = false;

  constructor(private formBuilder: FormBuilder, 
              private addItemService: AddItemService) {
    this.createForm();
  }

  createForm() {
    this.addItemForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      imgUrl: ['', Validators.required],
      avail: ['', Validators.required ],
      description: ['', Validators.required],
      ovnew_user_id: ['', Validators.required],
      category_id: ['', Validators.required]
    });
  }

  onSubmit() {
    this.saveFormData();
    this.addItemService.saveItem(this.saveFormData()).subscribe();
    this.rebuildForm();
    this.addItemTrue = !this.addItemTrue;
  }

  rebuildForm() {
    this.addItemForm.reset();
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
  }

  saveFormData(): SaveItem {
    const formModel = this.addItemForm.value;

    const saveForm: SaveItem = {
      productName: formModel.productName,
      productPrice: formModel.productPrice,
      imgUrl: formModel.imgUrl,
      avail: formModel.avail,
      description: formModel.description,
      owner_user_id: JSON.parse(localStorage.getItem('currentUser'))._id,
      category_id: formModel.category_id
    };
    return saveForm;
  }

  ngOnInit() {
    this.productId = this.addItemForm.value.user_id + this.getRandom(1, 999999) + '_';
  }

}
