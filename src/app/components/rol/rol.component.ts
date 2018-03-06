import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { RolService } from '../../services/rol.service';
import { MdlDialogService } from '@angular-mdl/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-rol',
	templateUrl: './rol.component.html',
	styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

	//Page Strings
	pageTitle = "Manage Roles";
	addNewTitle = "New Rol";
	btnDelete = "Delete";
	btnCancel = "Cancel";
	btnSaveObject = "Save";


	rowElementActive: any;

	//Component Strings
	object = { id: null, name: null };
	show_form = false;
	editing = false;
	my_list: any[];

	constructor(private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private rolService: RolService, private dialogService: MdlDialogService) {

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
		return this.rolService.getAll();
	}

	removeObject(object) {
		this.object = object;
		this.rolService.remove(this.object.id);

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
			this.rolService.merge(this.object);
		} else {
			this.object.id = Date.now();
			this.rolService.merge(this.object);
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
