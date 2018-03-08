import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../../router.animations';

import {
  Input, Output, AfterContentInit, ContentChild,
  AfterViewChecked, AfterViewInit, ViewChild, ViewChildren
} from '@angular/core';
import { ManageUsersService } from '../../../services/manage-users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;

  @ViewChildren('focus_input') fi;

  ngAfterViewInit() {
    this.fi.first.nativeElement.focus();
  }

  constructor(public afAuth: AngularFireAuth, private router: Router,private manageUsersService: ManageUsersService) {

  }

  ngOnInit() {

  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.afAuth.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
        .then(
        (success) => {
          console.log(success);
          console.log(success.uid);
          let object = { id: Date.now(), name: formData.value.name, lastName: formData.value.lastname, email: formData.value.email, username: formData.value.email, password: formData.value.password, photo: null, city: null, rol: 'User', uid: success.uid};
          //Updating user
          var user = this.afAuth.auth.currentUser;
          user.updateProfile({
            displayName: object.name + " " + object.lastName,
            photoURL: "./assets/images/user.png"
          }).then(function() {
            console.log("Updated")
          }).catch(function(error) {
            console.log(error)
          });          
          this.manageUsersService.merge(object, null);
          this.router.navigate(['/login'])
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        })
    }
  }

}
