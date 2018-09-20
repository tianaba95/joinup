import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { MdlDialogService } from '@angular-mdl/core';
import { ContactMessageService } from '../../services/contact-message.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ManageUsersService } from '../../services/manage-users.service';


declare var $: any;

@Component({
  selector: 'app-contact-message',
  templateUrl: './contact-message.component.html',
  styleUrls: ['./contact-message.component.css']
})
export class ContactMessageComponent implements OnInit {

  //Page Strings
  pageTitle = "Contact Message";
  

  //Component Strings
  object = { id: null, title: null, text: null, user_id: null };
  my_list: any[];
  isguide: any;

  name: any;
	is_a_guide: any;
	isuser:any;

  constructor(private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private contactMessageService: ContactMessageService, private dialogService: MdlDialogService, private manageUsersService: ManageUsersService) {
   
    var user = this.afAuth.auth.currentUser;
		if (user){
			this.name = user.email;
			console.log(user);
		}
    this.isguide = this.manageUsersService.isguide;
    console.log(this.isguide)
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
    this.isguide = (localStorage.getItem('guide')==='true');
  }

  /*
  testJquery(){
      $('#grow').toggleClass('growed');     
  }
  */

  initObjectSuscribe() {
    this.getObjectList()
      .subscribe(
      objects => {
        this.setObject(objects);
      }
      );
  }

  getObjectList() {
    return this.contactMessageService.getAll();
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

  setObject(objects) {
    this.my_list = objects;

    //FOR SHOW MORE FUNCTION
    this.my_list.forEach(function (element) {
      if (element.text && element.text.length > 250) {
        element.text_p = element.text.slice(0, 200);
        element.text_span = element.text.slice(200);
      } else {
        element.text_p = element.text;
      }
    });
  }

  removeObject(object) {
    this.object = object;
    this.contactMessageService.remove(this.object.id);

    this.resetObject();
  }

  archiveObject(object) {
    console.log("ARCHVO")
    console.log(object)
    object.archive = 1;
    this.contactMessageService.merge(object);


  }

  unArchiveObject(object) {
    object.archive = 0;
    this.contactMessageService.merge(object);
  }

  deleteConfirmation(object) {
    var deleteObject = object.title;

    let result = this.dialogService.confirm('Delete ' + deleteObject + '?', 'No', 'Yes');
    result.subscribe(() => {
      console.log('confirmed');
      this.removeObject(object);
    },
      (err: any) => {
        console.log('declined');
      }
    );
  }

  resetObject() {
    this.object = { id: null, title: null, text: null, user_id: null };
  }

}
