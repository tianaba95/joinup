import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Upload } from '../uploads/upload';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class WantoteachService {constructor(public afDB:AngularFireDatabase) { }
  
  private modelPath:string = 'iwanttoteach';
  private basePath:string = '/uploads';
  uploads: FirebaseListObservable<Upload[]>;

  //------USERS------
  getAll(){
    return this.afDB.list(`/${this.modelPath}`);
  }

  merge(object, upload){
    if(upload){
      this.pushUpload(upload, object)
    }else{
      this.afDB.database.ref(`${this.modelPath}/` + object.id).set(object);
    }
  }

  getObject(id){
  return this.afDB.database.ref(`${this.modelPath}/` + id).once('value');
  }

  remove(id){
    this.afDB.database.ref(`${this.modelPath}/` + id).remove();
  }

  pushUpload(upload: Upload, object) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        upload.progress = Math.round((uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100);
        console.log(upload.progress);
      },
      (error) => {
      // upload failed
      console.log(error)
      },
      () => {
      // upload success
      upload.url = uploadTask.snapshot.downloadURL
      upload.name = upload.file.name
      this.saveFileData(upload)

      object.resume = uploadTask.snapshot.downloadURL;
      this.afDB.database.ref(`${this.modelPath}/` + object.id).set(object);
      }
    );
    }

    // Writes the file details to the realtime db
    private saveFileData(upload: Upload) {
    this.afDB.list(`${this.basePath}/`).push(upload);
    }

  //------END UPLOAD------

}
