import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, googleUser } from '../../../shared/models/user';
import { UserService } from '../../../shared/core/services/user.service';
import { AuthService } from '../../../shared/core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  googleUser = [];
  loading = true;

  constructor(private userService: UserService, private authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      this.loadAllUsers();
      this.loadGoogleUser();
  }

  deleteUser(id: number) {
      this.userService.delete(id).pipe(first()).subscribe(() => { 
          this.loadAllUsers() 
      });
  }

  private loadGoogleUser() {
    this.authService.user.subscribe(data => {
        this.googleUser.push(data);
        this.loading = false;
      });
  }

  private loadAllUsers() {
      this.userService.getAll().pipe(first()).subscribe(users => { 
          this.users = users; 
      });
  }
}
