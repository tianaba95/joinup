import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isAuth =false;

  constructor(public afAuth: AngularFireAuth,private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      if(auth) {
        //this.router.navigateByUrl('/users');
        this.isAuth = true;
      }else{
        this.isAuth = false;
      }
    });

  }
}
