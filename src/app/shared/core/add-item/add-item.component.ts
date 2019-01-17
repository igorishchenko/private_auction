import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../models/item';
import { AddItemService } from '../services/add-item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
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
      user_id: '',
      user_name: '',
      id: ''
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

  saveFormData(): Item {
    const formModel = this.addItemForm.value;

    const saveForm: Item = {
      id: JSON.parse(localStorage.getItem('currentUser'))._id + '_' + this.getRandom(1, 999999),
      productName: formModel.productName,
      productPrice: formModel.productPrice,
      imgUrl: formModel.imgUrl,
      avail: formModel.avail,
      description: formModel.description,
      user_id: JSON.parse(localStorage.getItem('currentUser'))._id,
      user_name: JSON.parse(localStorage.getItem('currentUser')).firstName + ' ' + JSON.parse(localStorage.getItem('currentUser')).lastName
    }
    return saveForm;
  }

  ngOnInit() {
    this.productId = this.addItemForm.value.user_id + this.getRandom(1,999999) + '_';
  }

}
