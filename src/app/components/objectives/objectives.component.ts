import { Component, OnInit } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import { ObjectiveService } from '../../services/objective.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { PageTitleService } from '../../services/page-title.service';
import { ManageUsersService } from '../../services/manage-users.service';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit {

  	//Page Strings
	pageTitle = "Manage Objectives";
	addNewTitle = "New Objective";
	btnDelete = "Delete";
	btnCancel = "Cancel";
	btnSaveObject = "Save";


  rowElementActive: any;
  
  //Component Strings
	object = { id: null, name: null };
	show_form = false;
	editing = false;
	my_list: any[];
	name: any;
  	isguide: any;
	isuser:any;
  
  constructor(private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private objectiveService: ObjectiveService, private dialogService: MdlDialogService, private manageUsersService: ManageUsersService) {
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
		return this.objectiveService.getAll();
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
						  thisTemp.isguide = true;
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

	removeObject(object) {
		this.object = object;
		this.objectiveService.remove(this.object.id);

		this.show_form = false;
		this.resetObject();
	}

	viewObject(object) {
		this.editing = true;
		this.object = object;
		this.show_form = true;
	}

	addObject() {
		this.editing = false;
		this.show_form = true;
		this.resetObject();
	}

	createObject() {
		if (this.editing) {
			this.objectiveService.merge(this.object);
		} else {
			this.object.id = Date.now();
			this.objectiveService.merge(this.object);
		}

		this.show_form = false;
		this.resetObject();
	}

	cancel() {
		this.show_form = false;
		this.resetObject();
		this.editing = false;
	}

	resetObject() {
		this.object = { id: null, name: null };
	}

	deleteConfirmation(object) {
		this.rowElementActive = object.id;

		var deleteObject = object.name;

		let result = this.dialogService.confirm('Delete ' + deleteObject + '?', 'No', 'Yes');
		result.subscribe(() => {
			console.log('confirmed');
			this.rowElementActive = null;
			this.removeObject(object);
		},
			(err: any) => {
				console.log('declined');
				this.rowElementActive = null;
			}
		);
	}


}
