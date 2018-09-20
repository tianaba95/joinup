import { Component, OnInit } from '@angular/core';

import { PageTitleService } from '../../../services/page-title.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  pageTitle: String;

  is403:any;

  constructor(public afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, public location: Location) {
    this.is403 = this.pageTitleService.isPage403();
    var thisNew = this;
    router.events.subscribe((val) => {
      console.log(val)
      if (thisNew.location.path() == '/403'){
        thisNew.is403 = true;
      }
    });
    console.log(this.is403);
  }

  ngOnInit() {
    this.pageTitleService.title.subscribe((val: string) => {
      this.pageTitle = val;
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }

}
