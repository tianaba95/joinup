import { Component, OnInit } from '@angular/core';

import { PageTitleService } from '../../../services/page-title.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  pageTitle: String;

  constructor(public afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService) {
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
