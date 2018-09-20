import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ManageUsersService } from '../../services/manage-users.service';

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

  my_list: any[];
  name: any;
	is_a_guide: any;
	isuser:any;

  constructor(public afAuth: AngularFireAuth,private router: Router,private pageTitleService: PageTitleService, private manageUsersService: ManageUsersService) {
    var user = this.afAuth.auth.currentUser;
		if (user){
			this.name = user.email;
			console.log(user);
    }
    this.initPeopleObjectSuscribe();
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
