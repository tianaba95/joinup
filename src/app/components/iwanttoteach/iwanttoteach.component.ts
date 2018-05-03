import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { PageTitleService } from '../../services/page-title.service';
import { WantoteachService } from '../../services/wantoteach.service';

@Component({
  selector: 'app-iwanttoteach',
  templateUrl: './iwanttoteach.component.html',
  styleUrls: ['./iwanttoteach.component.css']
})
export class IwanttoteachComponent implements OnInit {
  
  //Page Strings
  pageTitle = "Want to Teach";
  username_img: any;

  //Component Strings
  object = { id: null, name: null, whyguide: null, phone: null, resume: null };
  my_list: any[];

  constructor(private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private dialogService: MdlDialogService, private wantoteachService: WantoteachService) {

    this.afAuth.authState.subscribe((auth) => {
      if (!auth) {
        this.router.navigateByUrl('/login');
      } else {
        var user = this.afAuth.auth.currentUser;
        if (user){
          if(user.photoURL){
            this.username_img = user.photoURL;}
        }
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
    console.log(this.my_list[0])
  }

  removeObject(object) {
    this.wantoteachService.remove(this.object.id);
    this.resetObject();
  }

  archiveObject(object) {
    console.log("ARCHVO")
    console.log(object)
    object.archive = 1;
  }

  unArchiveObject(object) {
    object.archive = 0;
  }

  deleteConfirmation(object) {
    var deleteObject = object.name;

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
    this.object = { id: null, name: null, whyguide: null, phone: null, resume: null };
  }

}
