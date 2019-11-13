import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/core/services/user.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public settingsForm: FormGroup;
  private currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private formBuilder: FormBuilder,
              private user: UserService ) {
    this.createForm();
  }

  createForm() {
    this.settingsForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: '',
      phone: '',
      address: '',
      description: ''
    });
  }

  onSubmit() {
    this.saveFormData();
    // this.user.update(this.saveFormData()).subscribe();
  }

  saveFormData() {
    const formModel = this.settingsForm.value;

    const saveForm = {
      _id: JSON.parse(localStorage.getItem('currentUser'))._id,
      username: formModel.username ||
        JSON.parse(localStorage.getItem('currentUser')).username,
      firstName: formModel.firstname ||
        JSON.parse(localStorage.getItem('currentUser')).firstName,
      lastName: formModel.lastname ||
        JSON.parse(localStorage.getItem('currentUser')).lastName,
      password: this.currentUser.password,
      email: formModel.email ||
        this.currentUser.email,
      phone: formModel.phone ||
        this.currentUser.phone,
      address: formModel.address ||
        this.currentUser.address,
      description: formModel.description ||
        this.currentUser.description
    };
    return saveForm;
  }

  ngOnInit() {
    // this.user.getById(this.currentUser._id).subscribe(userData => {
    //   this.currentUser = userData;
    // });
  }

}
