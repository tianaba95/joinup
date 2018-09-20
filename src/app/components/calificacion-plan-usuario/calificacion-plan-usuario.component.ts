import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { MdlDialogService } from '@angular-mdl/core';
import { SocialService } from '../../services/social.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ManageUsersService } from '../../services/manage-users.service';

@Component({
  selector: 'app-calificacion-plan-usuario',
  templateUrl: './calificacion-plan-usuario.component.html',
  styleUrls: ['./calificacion-plan-usuario.component.css']
})
export class CalificacionPlanUsuarioComponent implements OnInit {

  //Page Strings
  pageTitle = "Social Plans Rate";
  show_form = false;

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
  name: any;
	is_a_guide: any;
	isuser:any;

  constructor(private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private socialService: SocialService, private dialogService: MdlDialogService, private manageUsersService: ManageUsersService) {
    
    var user = this.afAuth.auth.currentUser;
		if (user){
			this.name = user.email;
			console.log(user);
		}
    this.afAuth.authState.subscribe((auth) => {
      if (!auth) {
        this.router.navigateByUrl('/login');
      }
    });
    
    this.initObjectSuscribe();
    this.initPeopleObjectSuscribe();
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

  initPeopleObjectSuscribe() {
		this.getPeopleList()
			.subscribe(
				objects => {
					this.my_list = objects;
					let thisTemp = this;
					this.my_list.forEach( function (arrayItem)
					{
					  if(arrayItem.email == thisTemp.name){
						if(arrayItem.rol == 'Guide'){
						  thisTemp.manageUsersService.isguide = true;
						  localStorage.removeItem('guide');
						  localStorage.setItem('guide', thisTemp.manageUsersService.isguide.toString());  
						  thisTemp.is_a_guide = true;
						}else if(arrayItem.rol == 'User'){
						  console.log("JUST AN USER")
						  thisTemp.router.navigateByUrl('/403');
						}else{
						  localStorage.removeItem('guide');
						  localStorage.setItem('guide', 'false');  
						}
					  }
					});
				  }
			);
	}

	getPeopleList() {
		return this.manageUsersService.getAll();
	}

}
