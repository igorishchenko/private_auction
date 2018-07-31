import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './services/auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      if (true) {
        return true;
      } else if (this.auth.user) {
        return this.auth.user.pipe(
          take(1),
          map(user => !!user),
          tap(loggedIn => {
            if (!loggedIn) {
              console.log('access denied')
              this.router.navigate(['/login']);
            }
          }))
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      }
    }
}
