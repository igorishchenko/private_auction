import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { first, tap, mapTo, catchError } from 'rxjs/operators';
import { switchMap, map } from 'rxjs/operators';

interface UserGoogle {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  cathPhrase?: string;
}

export class Tokens {
  token: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string; 

  public user: Observable<UserGoogle>;
  public dbUser: any;
  public firstName: String;
  public lastName: String;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private http: HttpClient
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<UserGoogle>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserGoogle = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    if (data) {
      this.router.navigate(['/']);
    }
    return userRef.set(data, { merge: true });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // login(email: string, password: string) {
  //   return this.http.post<{email: string, password: string}>
  //   ('http://vis.net.ua/vis-auction/public/api/login', { email: email, password: password })
  //     .pipe(
  //       map(user => {
  //         JSON.stringify(user);
  //         this.dbUser = user;
  //         return user;
  //       }));
  // }

  login(user: {email: string, password: string}): Observable<boolean> {
    return this.http.post<any>('http://vis.net.ua/vis-auction/public/api/login', user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }

  // logout() {
  //   return this.http.post<any>(`${config.apiUrl}/logout`, {
  //     'refreshToken': this.getRefreshToken()
  //   }).pipe(
  //     tap(() => this.doLogoutUser()),
  //     mapTo(true),
  //     catchError(error => {
  //       alert(error.error);
  //       return of(false);
  //     }));
  // }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  // refreshToken() {
  //   return this.http.post<any>(`${config.apiUrl}/refresh`, {
  //     'refreshToken': this.getRefreshToken()
  //   }).pipe(tap((tokens: Tokens) => {
  //     this.storeJwtToken(tokens.jwt);
  //   }));
  // }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
