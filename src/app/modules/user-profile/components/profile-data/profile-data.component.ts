import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {
  @Input() profile = null;

  constructor() { }

  ngOnInit() {
  }

}
