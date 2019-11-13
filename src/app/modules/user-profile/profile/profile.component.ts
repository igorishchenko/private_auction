import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/shared/core/services/user.service';
import { Profile } from 'src/app/shared/models/profile';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  profileObservable$: Observable<Profile>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(): Observable<Profile> {
    if (this.profileObservable$) {
      return;
    }
    this.profileObservable$ = this.userService.getProfile();
  }

}
