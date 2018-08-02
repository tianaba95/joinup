import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../../router.animations';
import { Observable } from 'rxjs/Observable';
import { ManageUsersService } from '../../../services/manage-users.service';

import {
  Input, Output, AfterContentInit, ContentChild,
  AfterViewChecked, AfterViewInit, ViewChild, ViewChildren
} from '@angular/core';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;

  email: String;
  password: any;
  my_list: any[];
  found: any;

  //Test
  redUrl = "http://localhost:8282/home";
  //Prod
  //redUrl = "http://joinup-app.firebaseapp.com/home";
  @ViewChildren('focus_input') fi;

  ngAfterViewInit() {
    this.fi.first.nativeElement.focus();
  }

  constructor(public afAuth: AngularFireAuth, private router: Router, private manageUsersService: ManageUsersService) {
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

  ngOnInit() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);

      //this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider());

      this.afAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
        .then((success) => {
          console.log(success);
          //this.router.navigate(['/demo']);
        })
        .catch(err => {
          console.log(err)
          this.error = err;
        });
    }
  }

  initObjectSuscribe() {
    this.getObjectList()
      .subscribe(
      objects => {
        this.my_list = objects;
      }
      );
  }

  getObjectList() {
    return this.manageUsersService.getAll();
  }

  linkToUrlFunction(url, id){
    var openingUrl = url + '/' + id;
    window.open(openingUrl,"_self");
  }

}
