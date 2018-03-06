import { Component, OnInit } from '@angular/core';
import { ManageUsersService } from '../../services/manage-users.service';
import { Upload } from '../../uploads/upload';
import { PageTitleService } from '../../services/page-title.service';
import { Router } from '@angular/router';

import { MdlDialogService } from '@angular-mdl/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  //Page Strings
  pageTitle = "Manage Users";
  addNewTitle = "New User";
  btnDelete = "Delete";
  btnCancel = "Cancel";
  btnSaveObject = "Save";

  show_form = false;
  editing = false;

  rowElementActive: any;

  object = { id: null, name: null, lastName: null, email: null, username: null, password: null, photo: null, city: null, rol: null };
  my_list: any[];

  rol = {};
  my_roles: any[];

  rol_filter = "";
  name_filter = "";
  username_filter = "";
  email_filter = "";
  city_filter = "";

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private manageUsersService: ManageUsersService, private dialogService: MdlDialogService) {

    this.initObjectSuscribe();
    this.initRolSuscribe();
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

  initRolSuscribe() {
    this.getRolList()
      .subscribe(
      roles => {
        this.my_roles = roles;
      }
      );
  }

  getObjectList() {
    return this.manageUsersService.getUsersByRol(this.rol_filter);
  }

  getRolList() {
    return this.manageUsersService.getAllRol();
  }

  removeObject(object) {
    this.object = object;
    this.manageUsersService.remove(this.object.id);

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
      if (this.selectedFiles) {
        let file = this.selectedFiles.item(0)
        this.currentUpload = new Upload(file);
      }
      this.manageUsersService.merge(this.object, this.currentUpload);
    } else {
      this.object.id = Date.now();
      if (this.selectedFiles) {
        this.uploadSingle();
        let file = this.selectedFiles.item(0)
        this.currentUpload = new Upload(file);
      }
      this.manageUsersService.merge(this.object, this.currentUpload);
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
    this.object = { id: null, name: null, lastName: null, email: null, username: null, password: null, photo: null, city: null, rol: null };
    this.selectedFiles = null;
    this.currentUpload = null;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.manageUsersService.pushUpload(this.currentUpload, this.object)
  }

  tabChanged(tab) {
    var filter = "";

    if (tab.index == 0) {
      filter = "";
    }

    var length = this.my_roles.length;
    for (var i = 0; i < length; i++) {
      if (tab.index == i + 1) {
        filter = this.my_roles[i].name;
      }
    }
    this.setRolFilter(filter);
  }

  setRolFilter(new_rol) {
    console.log(new_rol)
    this.rol_filter = new_rol;
    this.initObjectSuscribe();
  }

  deleteConfirmation(object) {
    this.rowElementActive = object.id;

    var deleteUser = object.name;
    deleteUser += object.lastName ? ' ' + object.lastName : '';

    let result = this.dialogService.confirm('Delete ' + deleteUser + '?', 'No', 'Yes');
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
