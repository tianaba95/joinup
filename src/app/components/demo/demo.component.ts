import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  pageTitle = 'Demo';
  nombre: any;

  kidGenre = '';
  signoHijo = '';
  signos = [
    { name: "Acuario", id: 1 },
    { name: "Piscis", id: 2 },
    { name: "Aries", id: 3 },
    { name: "Tauro", id: 4 },
    { name: "Géminis", id: 5 },
    { name: "Cáncer", id: 6 },
    { name: "Leo", id: 7 },
    { name: "Virgo", id: 8 },
    { name: "Libra", id: 9 },
    { name: "Escorpio", id: 10 },
    { name: "Sagitario", id: 11 },
    { name: "Capricornio", id: 12 }
  ];

  constructor(public afAuth: AngularFireAuth,private router: Router,private pageTitleService: PageTitleService) {

  }
  
  ngOnInit() {
    this.pageTitleService.setTitle(this.pageTitle);
  }

  changeKidGenre(genre) {
    this.kidGenre = genre;
  }

  changeKidSign(event) {
    this.signoHijo = event.target.value;
  }

}
