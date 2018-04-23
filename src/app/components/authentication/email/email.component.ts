import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../../router.animations';
import { Observable } from 'rxjs/Observable';

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

  email: any;
  password: any;
  @ViewChildren('focus_input') fi;

  ngAfterViewInit() {
    this.fi.first.nativeElement.focus();
  }

  constructor(public afAuth: AngularFireAuth, private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.router.navigateByUrl('/users');
      }
    });

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

}
