import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/core/services/category.service';
import { AddItemService } from 'src/app/shared/core/services/add-item.service';
import { Profile } from 'src/app/shared/models/profile';
import { UserService } from 'src/app/shared/core/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit, AfterViewInit {
  profile: any = null;
  isAddLot: boolean = false;
  addItemForm: FormGroup;
  categories: Category[] = [];
  allCategories$: any;
  fileToUpload: File = null;
  profileObservable$: Observable<Profile>;

  constructor(
    private fb: FormBuilder,
    private catService: CategoryService,
    private itemService: AddItemService,
    private userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.allCategories$ = this.catService.getAllCategories();
    this.getProfile();
  }

  ngAfterViewInit(): void {}

  getProfile(): void {
    this.userService.getProfile().subscribe(data => this.profile = data.success);
  }

  createForm(): void {
    this.addItemForm = this.fb.group({
      productName: [''],
      productPrice: [''],
      avail: [''],
      imgUrl: [''],
      category_id: [''],
      description: ['']
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit(): void {
    this.addItemForm.controls.imgUrl.setValue('http://obediznichego.ru/wp-content/uploads/2012/08/IMG_6522.jpg');
    const formValue = {...this.addItemForm.value, category_id: +this.addItemForm.controls.category_id.value};
    this.itemService.saveItem(formValue).subscribe(res => {
      this.addItemForm.reset();
      alert('Added!');
    });
  }
}
