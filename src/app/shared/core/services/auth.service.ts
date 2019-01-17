import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { switchMap, map } from 'rxjs/operators';

interface UserGoogle {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  cathPhrase?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:8080/api/authenticate', { username: username, password: password })
      .pipe(map(user => {
        JSON.stringify(user);
        this.dbUser = user;
        return user;
      }));
  }

  logout() {
    //remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  ngOnInit() {
    
  }
}
