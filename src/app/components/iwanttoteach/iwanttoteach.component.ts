import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { PageTitleService } from '../../services/page-title.service';
import { WantoteachService } from '../../services/wantoteach.service';
import { ManageUsersService } from '../../services/manage-users.service';
import { SendmailService } from '../../services/sendmail.service';


@Component({
  selector: 'app-iwanttoteach',
  templateUrl: './iwanttoteach.component.html',
  styleUrls: ['./iwanttoteach.component.css']
})
export class IwanttoteachComponent implements OnInit {
  
  //Page Strings
  pageTitle = "Want to Teach";

  //Component Strings
  object = { id: null, name: null, whyguide: null, phone: null, resume: null, photo: null, userId: null };
  my_list: any[];

  constructor(private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private dialogService: MdlDialogService, private wantoteachService: WantoteachService, private manageuserService: ManageUsersService, private sendmailService: SendmailService) {

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
        this.setObject(objects);
      }
      );
  }

  getObjectList() {
    return this.wantoteachService.getAll();
  }

  setObject(objects) {
    this.my_list = objects;
  }

  removeObject(id) {
    this.wantoteachService.remove(id);
    this.resetObject();
  }

  deleteConfirmation(object) {
    var deleteObject = object.name;

    let result = this.dialogService.confirm('Delete ' + deleteObject + '?', 'No', 'Yes');
    var thisTemp = this;
    result.subscribe(() => {
      console.log('confirmed');
      thisTemp.removeObject(object.id);
    },
      (err: any) => {
        console.log('declined');
      }
    );
  }

  resetObject() {
    this.object = { id: null, name: null, whyguide: null, phone: null, resume: null, photo: null, userId: null };
  }

  downloadResume(id){
    this.my_list.forEach(function (element) {
      if (element.id == id) {
        window.open(element.resume);
      } 
    });
  }

  sendMail(email) {
    return this.sendmailService.sendEmail(email);
  }

  changetoGuide(object){
    console.log(object.userId)

    let result = this.dialogService.confirm('Convert ' + object.name + ' to guide?', 'No', 'Yes');
    var thisTemp = this;
    result.subscribe(() => {
      console.log('confirmed');
      let updateObject = {rol: 'Guide', whyguide: object.whyguide};
      thisTemp.manageuserService.update(object.userId, updateObject);
      thisTemp.removeObject(object.id);
    },
      (err: any) => {
        console.log('declined');
      }
    );

    this.sendMail(object.email);
  }

}
