import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/shared/core/services/user.service';
import { Profile } from 'src/app/shared/models/profile';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['profile/data']);
  }
}
