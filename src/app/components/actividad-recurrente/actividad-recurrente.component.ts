import { Component, OnInit } from '@angular/core';
import { Upload } from '../../uploads/upload';
import { PageTitleService } from '../../services/page-title.service';
import { SocialService } from '../../services/social.service';
import { MdlDialogService } from '@angular-mdl/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ManageUsersService } from '../../services/manage-users.service';

declare var $: any;

@Component({
	selector: 'app-actividad-recurrente',
	templateUrl: './actividad-recurrente.component.html',
	styleUrls: ['./actividad-recurrente.component.css']
})
export class ActividadRecurrenteComponent implements OnInit {

	//Page Strings
	pageTitle = "Social Plans";
	addNewTitle = "New Plan";
	btnDelete = "Delete";
	btnCancel = "Cancel";
	btnSaveObject = "Save";
	btnEdit = "Edit";

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

	plan_category_tab = [{ 'name': 'Recurrent', 'slug': 'recurrent' }, { 'name': 'Onetime', 'slug': 'onetime' }];

	disableTargaryens = false;

	//Upload Components
	selectedFiles: FileList;
	currentUpload: Upload;

	date: Date;

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

		this.date = new Date();

		this.initPeopleObjectSuscribe();
	}

	ngOnInit() {
		this.pageTitleService.setTitle(this.pageTitle);
		this.initObjectSuscribe();
		this.initObjectCategorySuscribe(null);

    /*
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15, // Creates a dropdown of 15 years to control year,
			today: 'Today',
			clear: 'Clear',
			close: 'Ok',
			closeOnSelect: false // Close upon selecting a date,
      });
      */
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

	initObjectSuscribe() {
		this.getObjectList()
			.subscribe(
			objects => {
				this.setObject(objects);
			}
			);
	}

	initObjectCategorySuscribe(param) {
		this.getTabList(param)
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

	getTabList(param) {
		return this.socialService.getAllPlanByRecurrent(param);
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
		console.log(this.object.date)
		this.show_form = true;
	}

	addObject() {
		this.editing = false;
		this.show_form = true;
		this.resetObject();
	}

	createObject() {
		this.object.date = this.formatDate(this.object.date);
		this.object.recurrent = false;

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
	}
	uploadSingle() {
		let file = this.selectedFiles.item(0)
		this.currentUpload = new Upload(file);
		this.socialService.pushUpload(this.currentUpload, this.object)
	}

	setObject(objects) {
		//this.my_list = objects;

		//this.calcItemRate();

		//FILTER BY APPROVED BEFORE SHOW
		//Ensure to get a correct JSON
		var my_json = JSON.stringify(objects)
		//We can use {'name': 'Lenovo Thinkpad 41A429ff8'} as criteria too
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
		var param = null;
		if (tab.index == 0) {
			param = null;
		} else if (tab.index == 1) {
			param = true;
		} else {
			param = false;
		}

		this.initObjectCategorySuscribe(param);
	}

	setRecurrent(object, event) {

		if (event) {
			let pDialog = this.dialogService.showDialog({
				title: 'Make recurrent?',
				message: 'What periodicity do you prefer?',
				actions: [
					{
						handler: () => {
							object.recurrent = event;
							object.recurrentPeriodicity = 7;
							this.socialService.merge(object, null);
						},
						text: 'Semanal (7 días)'
					},
					{
						handler: () => {
							object.recurrent = event;
							object.recurrentPeriodicity = 14;
							this.socialService.merge(object, null);
						},
						text: 'Quincenal (14 días)'
					},
					{
						handler: () => {
							object.recurrent = event;
							object.recurrentPeriodicity = 21;
							this.socialService.merge(object, null);
						},
						text: '3-Semanal (21 días)'
					},
					{
						handler: () => {
							object.recurrent = event;
							object.recurrentPeriodicity = 28;
							this.socialService.merge(object, null);
						},
						text: 'mensual (28 días)'
					}
				],
				fullWidthAction: true,
				isModal: false,
			});
			pDialog.subscribe((dialogReference) => console.log('dialog visible', dialogReference));
		} else {
			object.recurrent = event;
			object.recurrentPeriodicity = null;
			this.socialService.merge(object, null);

		}

	}





	formatDate(date) {
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();

		console.log(day + '/' + monthIndex + '/' + year)
		return day + '/' + monthIndex + '/' + year;
	}

	jsonFilter(jsonObj, criteria) {
		return jsonObj.filter(function (obj) {
			return Object.keys(criteria).every(function (c) {
				return obj[c] == criteria[c];
			});
		});
	}
}
