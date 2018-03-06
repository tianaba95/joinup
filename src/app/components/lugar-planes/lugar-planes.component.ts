import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { MdlDialogService } from '@angular-mdl/core';
import { LugarPlanesService } from '../../services/lugar-planes.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-lugar-planes',
	templateUrl: './lugar-planes.component.html',
	styleUrls: ['./lugar-planes.component.css']
})
export class LugarPlanesComponent implements OnInit {

	//Page Strings
	pageTitle = "Social Plans Places";
	addNewTitle = "New Place";
	btnDelete = "Delete";
	btnCancel = "Cancel";
	btnSaveObject = "Save";

	rowElementActive: any;

	//Component Strings
	object = { id: null, name: null };
	show_form = false;
	editing = false;
	my_list: any[];

	constructor(private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private lugarPlanesService: LugarPlanesService, private dialogService: MdlDialogService) {

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
		return this.lugarPlanesService.getAll();
	}

	removeObject(object) {
		this.object = object;
		this.lugarPlanesService.remove(this.object.id);

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
			this.lugarPlanesService.merge(this.object);
		} else {
			this.object.id = Date.now();
			this.lugarPlanesService.merge(this.object);
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
