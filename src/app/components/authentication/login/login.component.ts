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
  email: String;
  found: any;
  //Test
  redUrl = "http://localhost:8282/home";
  //Prod
  //redUrl = "http://joinup-app.firebaseapp.com/home";

  constructor(public afAuth: AngularFireAuth,private router: Router, private manageUsersService: ManageUsersService) {
    this.afAuth.authState.subscribe((auth) => {
      if(auth) {
        this.email = auth.email;
        if(this.my_list){
          for (var i=0; i < this.my_list.length; i++) {
            if(this.my_list[i].email == this.email){
              this.found = this.my_list[i];
            }
          }
          if(this.found){
            console.log("found")
            if(this.found.rol == "User"){
              console.log(this.found.rol);
              this.linkToUrlFunction(this.redUrl, this.found.id);
            } else {     
              this.router.navigateByUrl('/users');
            }
          }
        }
      }
    });
    this.initObjectSuscribe(); 
  }

  private modelPath:string = 'users';

  ngOnInit() {
  }
  
  linkToUrlFunction(url, id){
    var openingUrl = url + '/' + id;
    window.open(openingUrl,"_self");
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

      var isit = 0;
      for (let object of thisTemp.my_list) {
        if(object.email == email){
          isit = 1;
          break;
        }
      }
      // ...
      if(isit == 0){
        let object = { id: Date.now(), name: displayName[0], lastName: displayName[1], email: email, username: null, password: null, photo: result.user.photoURL, city: null, rol: 'User', uid: result.user.uid};
        thisTemp.manageUsersService.merge(object, null);
      }
    }).catch(function(error) {
      console.log(error)
    });
  }

  loginGoogle() {
    console.log("LOG WITH GOOGLE");
    var thisTemp = this;
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(
      (result) => {
        var displayName = result.user.displayName.split(" ");
        var email = result.user.email;
  
        var isit = 0;
        for (let object of thisTemp.my_list) {
          if(object.email == email){
            isit = 1;
            break;
          }
        }
        // ...
        if(isit == 0){
          let object = { id: Date.now(), name: displayName[0], lastName: displayName[1], email: email, username: null, password: null, photo: result.user.photoURL, city: null, rol: 'User', uid: result.user.uid};
          thisTemp.manageUsersService.merge(object, null);
        }
    }).catch(
      (err) => {
      this.error = err;
    });

}

}
