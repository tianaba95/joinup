import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ManageUsersService } from '../../services/manage-users.service';

@Component({
  selector: 'app-plan-asistentes',
  templateUrl: './plan-asistentes.component.html',
  styleUrls: ['./plan-asistentes.component.css']
})
export class PlanAsistentesComponent implements OnInit {
  
  my_list: any[];
  show_form: any;
  name: any;
	is_a_guide: any;
  isuser:any;
  
  constructor(private afAuth: AngularFireAuth, private router: Router,  private manageUsersService: ManageUsersService) {
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
    
    this.initPeopleObjectSuscribe();
  }

  ngOnInit() {
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
