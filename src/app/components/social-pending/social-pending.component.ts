import { Component, OnInit } from '@angular/core';
import { Upload } from '../../uploads/upload';
import { PageTitleService } from '../../services/page-title.service';
import { SocialService } from '../../services/social.service';
import { ManageUsersService } from '../../services/manage-users.service';

import { MdlDialogService } from '@angular-mdl/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-pending',
  templateUrl: './social-pending.component.html',
  styleUrls: ['./social-pending.component.css']
})
export class SocialPendingComponent implements OnInit {

	//Page Strings
	pageTitle = "Social Plans Pending Approve";
  btnApprove = "Approve";
	btnReject = "Reject";
	show_form = false;
	isguide: any;

	//Component
	object = {
		id:null,
		image:null,
		category:null,
		title:null,
		location:null,
		adress:null,
		maxAsisstant:null,
		date:null,
		descriptionShort: null,
		descriptionLong: null,
		approved:null,
		cost:null,
		startingTime:null,
		endingTime:null,
		fee:null,
		guide:null,
		rate:null,
		recurrent:null
	};

	my_list: any[];
	plan_category_tab = [{'name':'By Date','slug':'date'},{'name':'By location','slug':'location'},{'name':'By category','slug':'category'}];

	tab_filter: any;

	constructor(private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private socialService:SocialService,private dialogService: MdlDialogService, private manageUsersService: ManageUsersService) {	
		 
		this.afAuth.authState.subscribe((auth) => {
			if (!auth) {
				this.router.navigateByUrl('/login');
			}
		});
		this.isguide = this.manageUsersService.isguide;
		console.log(this.isguide)

		this.tab_filter = "";
	}

	ngOnInit() {
		this.pageTitleService.setTitle(this.pageTitle);
		this.initObjectSuscribe();
		this.initObjectCategorySuscribe();
		this.isguide = (localStorage.getItem('guide')==='true');
	}
	
	initObjectSuscribe(){
		this.getObjectList()
			.subscribe(
				objects => {
					this.setObject(objects);
				}
			);
	}

	initObjectCategorySuscribe(){
		this.getTabList()
			.subscribe(
				objects => {
					this.setObject(objects);
					console.log(objects)
				}
			);
	}

	getObjectList(){
		return this.socialService.getAll();
	}

	getTabList(){
		return this.socialService.getAllPlanByCat(this.tab_filter);
	}

	removeObject(object){
		this.object = object;
    this.socialService.remove(this.object.id);
    
    this.resetObject();
  }
  
  approveObject(object){
    var nameMsg  = object.title;
	  
		let result = this.dialogService.confirm('Are you sure you want to approve ' + nameMsg + '?', 'No', 'Yes');
		result.subscribe( () => {
      object.approved = true;
      this.socialService.merge(object,null);
    },(err: any) => {
      console.log('declined');
    });
  }
  rejectObject(object){
    var nameMsg  = object.title;
	  
		let result = this.dialogService.confirm('Are you sure you want to reject ' + nameMsg + '?', 'No', 'Yes');
		result.subscribe( () => {
			this.removeObject(object);
    },(err: any) => {
      console.log('declined');
    });
  }

	resetObject(){
		this.object =  {
			id:null,
			image:null,
			category:null,
			title:null,
			location:null,
			adress:null,
			maxAsisstant:null,
			date:new Date(),
			descriptionShort: null,
			descriptionLong: null,
			approved:null,
			cost:null,
			startingTime:null,
			endingTime:null,
			fee:null,
			guide:null,
			rate:null,
			recurrent:null
		};
  }

	setObject(objects){
		this.my_list = objects;
		//this.calcItemRate();

		//FILTER BY APPROVED BEFORE SHOW
		//Ensure to get a correct JSON
		var my_json = JSON.stringify(objects)
		//We can use {'name': 'Lenovo Thinkpad 41A429ff8'} as criteria too
		var objects_filtered = this.jsonFilter(JSON.parse(my_json), {approved: false});

		this.my_list=objects_filtered;
	}

	deleteConfirmation(object){
	  
		var deletePlan  = object.title;
	  
		let result = this.dialogService.confirm('Delete ' + deletePlan + '?', 'No', 'Yes');
		result.subscribe( () => {
			console.log('confirmed');
			this.removeObject(object);
		  },
		  (err: any) => {
			console.log('declined');
		  }
		);
	}

	tabChanged(tab){
		var filter = "";
	  
		/*
		if(tab.index == 0){
			filter = "";
		}
		*/
	  
		var length = this.plan_category_tab.length;
		for (var i = 0; i < length; i++) { 
			if(tab.index == i+1){
				filter = this.plan_category_tab[i].slug;
			}
		}
		this.setTabFilter(filter);
	}

	setTabFilter(filter){
		console.log(filter)
		this.tab_filter=filter;
		this.initObjectCategorySuscribe();
	}


	jsonFilter(jsonObj,criteria){
		return jsonObj.filter(function(obj) {
		  return Object.keys(criteria).every(function(c) {
			return obj[c] == criteria[c];
		  });
		});
	}
}
