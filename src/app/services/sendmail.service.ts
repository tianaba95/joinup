import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@Injectable()
export class SendmailService {

  constructor(public afDB:AngularFireDatabase) { }

  private modelPath:string = 'sendmail';

  sendEmail(email, texto) {
    this.afDB.database.ref(`/${this.modelPath}`).push({
      emailid: email, text: texto
    })
  }

}
