import { Component, OnInit, HostBinding } from '@angular/core';
import {AngularFireAuth  } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn } from '../../../router.animations';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(public afAuth: AngularFireAuth,private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      if(auth) {
        this.router.navigateByUrl('/users');
      }
    });

  }

  ngOnInit() {
  }
  
  
  loginFb() {
    console.log("LOG WITH FB");
    /*
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
    (success) => {
      this.router.navigate(['/members']);
    }).catch(
    (err) => {
      this.error = err;
    })
    */
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(
      (success) => {
      this.router.navigate(['/users']);
    }).catch(
      (err) => {
      this.error = err;
    });

    /*
    this.afAuth.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      })
      */
}

}
