import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { MdlDialogService } from '@angular-mdl/core';
import { ContactMessageService } from '../../services/contact-message.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-contact-message',
  templateUrl: './contact-message.component.html',
  styleUrls: ['./contact-message.component.css']
})
export class ContactMessageComponent implements OnInit {

  //Page Strings
  pageTitle = "Contact Message";

  //Component Strings
  object = { id: null, title: null, text: null, user_id: null };
  my_list: any[];

  constructor(private afAuth: AngularFireAuth, private router: Router, private pageTitleService: PageTitleService, private contactMessageService: ContactMessageService, private dialogService: MdlDialogService) {

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
    return this.contactMessageService.getAll();
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
    this.contactMessageService.remove(this.object.id);

    this.resetObject();
  }

  archiveObject(object) {
    console.log("ARCHVO")
    console.log(object)
    object.archive = 1;
    this.contactMessageService.merge(object);


  }

  unArchiveObject(object) {
    object.archive = 0;
    this.contactMessageService.merge(object);
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
