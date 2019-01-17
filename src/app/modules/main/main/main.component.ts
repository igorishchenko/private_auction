import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, googleUser } from '../../../shared/models/user';
import { UserService } from '../../../shared/core/services/user.service';
import { AuthService } from '../../../shared/core/services/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public currentUser: any;
  public users: User[] = [];
  public googleUser: Array<any> = [];
  public loading: boolean = true;
  public userId: any;
  private userInfo: any;
  public pageAccessor:boolean = true;

  constructor(private userService: UserService, private authService: AuthService) {
    
    if(localStorage.getItem('currentUser')){
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    } else {
        this.userId = this.authService.dbUser._id;
    }
    this.currentUser = this.userService.getById(this.userId);
    this.currentUser.subscribe(currentUser => {
        localStorage.setItem('currentUser', JSON.stringify(
          { firstName: currentUser.firstName, lastName: currentUser.lastName, username: currentUser.username, _id: currentUser._id }
          ));
        this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
    });
    this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      this.loadAllUsers();
      this.loadGoogleUser();
      console.log(document.URL);
  }

  //This section will delete a user

  // deleteUser(id: number) {
  //     this.userService.delete(id).pipe(first()).subscribe(() => {
  //         this.loadAllUsers()
  //     });
  // }

  private loadGoogleUser(): void {
    this.authService.user.subscribe(data => {
        this.googleUser.push(data);
        this.loading = false;
      });
  }

  private loadAllUsers(): void {
      this.userService.getAll().pipe(first()).subscribe(users => { 
          this.users = users; 
      });
  }

  public getDocumentUrl(): void {
    let matcher = new RegExp('.*?4200\/(.*)');
    document.URL.match(matcher)[1] ?
      this.pageAccessor = false : this.pageAccessor = true;
  }
}
