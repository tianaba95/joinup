import { Component, OnInit } from '@angular/core';
import { Upload } from '../../uploads/upload';
import { PageTitleService } from '../../services/page-title.service';
import { SocialService } from '../../services/social.service';
import { ManageUsersService } from '../../services/manage-users.service';

import { MdlDialogService } from '@angular-mdl/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material';

@Component({
	selector: 'app-social',
	templateUrl: './social.component.html',
	styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

	//Page Strings
	pageTitle = "Social Plans";
	addNewTitle = "New Plan";
	btnDelete = "Delete";
	btnCancel = "Cancel";
	btnSaveObject = "Save";
	btnEdit = "Edit";
	isguide: any;

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
		rate: null,
		recurrent: null
	};


	show_form = false;
	editing = false;
	my_list: any[];
	my_guides: any[];
	plan_category_tab = [{ 'name': 'By Date', 'slug': 'date' }, { 'name': 'By location', 'slug': 'location' }, { 'name': 'By category', 'slug': 'category' }, { 'name': 'Popular', 'slug': 'popular' }];


	tab_filter: any;

	//Upload Components
	selectedFiles: FileList;
	currentUpload: Upload;
	fileName = "";

	date: Date;

	constructor(private dateAdapter: DateAdapter<Date>, private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private socialService: SocialService, private dialogService: MdlDialogService, private manageUsersService: ManageUsersService) {

		this.afAuth.authState.subscribe((auth) => {
			if (!auth) {
				this.router.navigateByUrl('/login');
			}
		});

		this.isguide = this.manageUsersService.isguide;
		console.log(this.isguide)

		this.date = new Date();
		this.tab_filter = "";
	}

	ngOnInit() {
		this.pageTitleService.setTitle(this.pageTitle);
		this.initObjectSuscribe();
		this.initGuideSuscribe();
		this.initObjectCategorySuscribe();
		this.isguide = (localStorage.getItem('guide')==='true');
	}

	initObjectSuscribe() {
		this.getObjectList()
			.subscribe(
			objects => {
				this.setObject(objects);
			}
			);
	}

	initGuideSuscribe() {
		this.getGuidetList()
			.subscribe(
			objects => {
				this.my_guides = objects;
			}
			);
	}

	initObjectCategorySuscribe() {
		this.getTabList()
			.subscribe(
			objects => {
				this.setObject(objects);
				console.log(objects)
			}
			);
	}

	getObjectList() {
		return this.socialService.getAll();
	}

	getGuidetList() {
		return this.socialService.getGuideList();
	}

	getTabList() {
		return this.socialService.getAllPlanByCat(this.tab_filter);
	}

	removeObject(object) {
		this.object = object;
		this.socialService.remove(this.object.id);

		this.show_form = false;
		this.resetObject();
	}

	viewObject(object) {
		this.editing = true;
		this.object = object;
		this.object.date = this.dateAdapter.parse(this.object.date, Date);
		this.object.fee = "$" + this.object.fee;
		this.object.cost = "$" + this.object.cost;
		this.show_form = true;
	}

	addObject() {
		this.editing = false;
		this.show_form = true;
		this.resetObject();
	}

	createObject() {
		this.object.date = this.formatDate(this.object.date);
		this.object.fee = this.object.fee.replace(/\$/g, '');
		this.object.cost = this.object.cost.replace(/\$/g, '');
		this.object.recurrent = false;

		//TODO IF GUIDE
		if(this.isguide)
		{
			this.object.approved = false;
		} else {
			this.object.approved = true;
		}
		
		if (this.editing) {
			if (this.selectedFiles) {
				let file = this.selectedFiles.item(0)
				this.currentUpload = new Upload(file);
			}
			this.socialService.merge(this.object, this.currentUpload);
		} else {
			this.object.id = Date.now();
			if (this.selectedFiles) {
				let file = this.selectedFiles.item(0)
				this.currentUpload = new Upload(file);
			}
			this.socialService.merge(this.object, this.currentUpload);
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
		this.object = {
			id: null,
			image: null,
			category: null,
			title: null,
			location: null,
			adress: null,
			maxAsisstant: null,
			date: new Date(),
			descriptionShort: null,
			descriptionLong: null,
			approved: null,
			cost: null,
			startingTime: null,
			endingTime: null,
			fee: null,
			guide: null,
			rate: null,
			recurrent: null
		};
	}

	detectFiles(event) {
		this.selectedFiles = event.target.files;
		console.log(this.selectedFiles[0].name);
		this.fileName = this.selectedFiles[0].name;
	}
	uploadSingle() {
		let file = this.selectedFiles.item(0)
		this.currentUpload = new Upload(file);
		this.socialService.pushUpload(this.currentUpload, this.object)
	}

	setObject(objects) {
		this.my_list = objects;
		//this.calcItemRate();

		//FILTER BY APPROVED BEFORE SHOW
		//Ensure to get a correct JSON
		var my_json = JSON.stringify(objects)
		var objects_filtered = this.jsonFilter(JSON.parse(my_json), { approved: true });

		this.my_list = objects_filtered;
	}

	//Este metodo se va a utilizar cuando se realice una votación
	calcItemRate() {
		for (let entry of this.my_list) {
			if (entry.rate && entry.rate.votes) {
				var average = 0;
				var numVotes = 0;
				for (let rate of entry.rate.votes) {
					average += rate;
					numVotes++;
				}
				average = average / numVotes;
				average = parseFloat(average.toFixed(2));
				entry.rate.average = average;
				//Votes * people to organize by Popular
				//*-1 because Firebase order min to max, so inverse to organize ax to min
				//TODO Calcular ponderado en vez de promedio, para tener en cuenta numero de votos y promedio,
				//ya que aqui muchos votos pequenos, superan facilmente pocos altos
				entry.rate.revertAverageXVotes = average * numVotes * -1;
				entry.rate.numVotes = numVotes;
				//Create an array and fill with 5 empty star
				entry.rate.stars = Array(5).fill('star_border');

				for (var i = 0; i < 5; i++) {
					var starCount = average - i;
					if (starCount >= 1) {
						entry.rate.stars[i] = "star";
					} else if (starCount >= 0.5) {
						entry.rate.stars[i] = "star_half";
					} else {
						entry.rate.stars[i] = "star_border";
					}
				}

				this.socialService.merge(entry, null);

			}
		}
	}

	deleteConfirmation(object) {

		var deletePlan = object.title;

		let result = this.dialogService.confirm('Delete ' + deletePlan + '?', 'No', 'Yes');
		result.subscribe(() => {
			console.log('confirmed');
			this.removeObject(object);
		},
			(err: any) => {
				console.log('declined');
			}
		);
	}

	tabChanged(tab) {
		var filter = "";

		/*
		if(tab.index == 0){
			filter = "";
		}
		*/

		var length = this.plan_category_tab.length;
		for (var i = 0; i < length; i++) {
			if (tab.index == i + 1) {
				filter = this.plan_category_tab[i].slug;
			}
		}
		this.setTabFilter(filter);
	}

	setTabFilter(filter) {
		console.log(filter)
		this.tab_filter = filter;
		this.initObjectCategorySuscribe();
	}

	formatDate(date) {
		console.log(date)
		var day = date.getDate();
		console.log("day: "+ day);
		var monthIndex = date.getMonth() + 1;
		console.log("month: "+ monthIndex);
		var year = date.getFullYear();
		console.log("year: "+ year);

		console.log(monthIndex + '/' + day + '/' + year)
		return monthIndex + '/' + day + '/' + year;
	}


	jsonFilter(jsonObj, criteria) {
		return jsonObj.filter(function (obj) {
			return Object.keys(criteria).every(function (c) {
				return obj[c] == criteria[c];
			});
		});
	}
}
