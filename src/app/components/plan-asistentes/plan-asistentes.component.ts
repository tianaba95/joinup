import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-asistentes',
  templateUrl: './plan-asistentes.component.html',
  styleUrls: ['./plan-asistentes.component.css']
})
export class PlanAsistentesComponent implements OnInit {
  
  my_list: any[];
  name: any[];
  show_form: any;
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
