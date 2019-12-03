import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/core/services/user.service';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Profile } from 'selenium-webdriver/firefox';
import { CategoryService } from 'src/app/shared/core/services/category.service';

@Component({
  selector: 'app-profile-lots',
  templateUrl: './profile-lots.component.html',
  styleUrls: ['./profile-lots.component.scss']
})
export class ProfileLotsComponent implements OnInit, OnDestroy {
  private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);
  profile: any;
  lots$: any = null;
  constructor(private profileService: UserService, private catService: CategoryService) { }

  ngOnInit() {
    this.profileService.getProfile().pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(res => {
      this.profile = res.success;
      if (this.profile) {
        this.lots$ = this.profileService.userLots(this.profile.id);
      }
    });
  }

  getCategory(id): void {
    let category;
    this.catService.categoryById(id).pipe(take(1)).subscribe(res => category = res.name);
    return category;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
