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
  my_list: any[];

  constructor(public afAuth: AngularFireAuth,private router: Router, private manageUsersService: ManageUsersService) {
    this.afAuth.authState.subscribe((auth) => {
      if(auth) {
        this.router.navigateByUrl('/users');
      }
    });
    this.initObjectSuscribe();
  }

  private modelPath:string = 'users';

  ngOnInit() {
  }
  
  getObjectList() {
    return this.manageUsersService.getAll();
  }

  initObjectSuscribe() {
    this.getObjectList()
      .subscribe(
      objects => {
        this.my_list = objects;
      }
      );
  }

  loginFb() {
    console.log("LOG WITH FB");
    var thisTemp = this;
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(function(result) {
      var displayName = result.user.displayName.split(" ");
      var email = result.user.email;
      var uid = result.user.uid;

      var isit = 0;
      for (let object of thisTemp.my_list) {
        if(object.email == email){
          isit = 1;
          break;
        }
      }
      // ...
      if(isit == 0){
        let object = { id: Date.now(), name: displayName[0], lastName: displayName[1], email: email, username: null, password: null, photo: null, city: null, rol: 'User', uid: uid};
        thisTemp.manageUsersService.merge(object, null);
      }
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

}

}
