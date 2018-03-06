import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { MdlDialogService } from '@angular-mdl/core';
import { SocialService } from '../../services/social.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calificacion-plan-usuario',
  templateUrl: './calificacion-plan-usuario.component.html',
  styleUrls: ['./calificacion-plan-usuario.component.css']
})
export class CalificacionPlanUsuarioComponent implements OnInit {

  //Page Strings
  pageTitle = "Social Plans Rate";

  //Component Strings
  //Component
  object = {
    id: null,
    image: null,
    category: null,
    title: null,
    location: null,
    adress: null,
    maxAsisstant: null,
    date: null,
		descriptionShort: null,
		descriptionLong: null,
    approved: null,
    cost: null,
    startingTime: null,
    endingTime: null,
    fee: null,
    guide: null,
    rate: null
  };

  my_list: any[];

  constructor(private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private socialService: SocialService, private dialogService: MdlDialogService) {

    this.afAuth.authState.subscribe((auth) => {
      if (!auth) {
        this.router.navigateByUrl('/login');
      }
    });
    
    this.initObjectSuscribe();
  }

  ngOnInit() {
    this.pageTitleService.setTitle(this.pageTitle);
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
    return this.socialService.getPlanPopular();
  }

}
