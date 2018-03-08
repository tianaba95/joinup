import { Component, OnInit, HostBinding } from '@angular/core';
import {AngularFireAuth  } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn } from '../../../router.animations';


import * as firebase from 'firebase/app';
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

  constructor(public afAuth: AngularFireAuth,private router: Router, private manageUsersService: ManageUsersService) {
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
    var provider = new firebase.auth.FacebookAuthProvider();
    var thisTemp = this;
    this.afAuth.auth.signInWithPopup(provider)
    .then(function(result) {
      var displayName = result.user.displayName.split(" ");
      var email = result.user.email;
      var uid = result.user.uid;
      // ...
      console.log(thisTemp.manageUsersService.getAll())

      let object = { id: Date.now(), name: displayName[0], lastName: displayName[1], email: email, username: null, password: null, photo: null, city: null, rol: 'User', uid: uid};
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
