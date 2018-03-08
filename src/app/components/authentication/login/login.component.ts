import { Component, OnInit, HostBinding } from '@angular/core';
import {AngularFireAuth  } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn } from '../../../router.animations';


import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { ManageUsersService } from '../../../services/manage-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(public afAuth: AngularFireAuth,private router: Router, private manageUsersService: ManageUsersService, public afDB:AngularFireDatabase) {
    this.afAuth.authState.subscribe((auth) => {
      if(auth) {
        this.router.navigateByUrl('/users');
      }
    });

  }

  private modelPath:string = 'users';

  ngOnInit() {
  }
  
  
  loginFb() {
    console.log("LOG WITH FB");
    var displayName:string = "";
    var email:string = "";
    var uid:string = "";
    var provider = new firebase.auth.FacebookAuthProvider();
    var thisTemp = this;
    this.afAuth.auth.signInWithPopup(provider)
    .then(function(result) {
      displayName = result.user.displayName;
      email = result.user.email;
      uid = result.user.uid;
      // ...
      let object = { id: Date.now(), name: displayName, lastName: displayName, email: email, username: email, password: null, photo: null, city: null, rol: 'User', uid: uid};
      thisTemp.manageUsersService.merge(object, null);
    }).catch(function(error) {
      console.log(error)
    });
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
