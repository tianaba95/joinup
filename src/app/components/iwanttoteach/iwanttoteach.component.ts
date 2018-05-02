import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { PageTitleService } from '../../services/page-title.service';

@Component({
  selector: 'app-iwanttoteach',
  templateUrl: './iwanttoteach.component.html',
  styleUrls: ['./iwanttoteach.component.css']
})
export class IwanttoteachComponent implements OnInit {
  
  //Page Strings
  pageTitle = "Contact Message";

  //Component Strings
  object = { id: null, title: null, text: null, user_id: null };
  my_list: any[];

  constructor(private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private dialogService: MdlDialogService) {

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
    return null;
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
