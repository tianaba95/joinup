import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iwanttoteach-form',
  templateUrl: './iwanttoteach-form.component.html',
  styleUrls: ['./iwanttoteach-form.component.css']
})
export class IwanttoteachFormComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      if (!auth) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  ngOnInit() {
  }

}
