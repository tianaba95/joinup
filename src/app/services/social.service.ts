import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Upload } from '../uploads/upload';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class SocialService {

	constructor(public afDB:AngularFireDatabase) { }

	private modelPath:string = 'social';
  private basePath:string = '/uploads';
  private modelPathUsers:string = 'users';
  uploads: FirebaseListObservable<Upload[]>;

  //------MODEL------
  getAll(){
    return this.afDB.list(`/${this.modelPath}`);
  }

  getPlanByApproved(isApproved){
    if(isApproved != ""){
      return this.afDB.list(`/${this.modelPath}`, { query: {
        orderByChild: 'approved',
        equalTo: isApproved,
        limitToFirst: 100
      }} )
    }else{
      return this.afDB.list(`/${this.modelPath}`);
    }
  }

  getGuideList(){
    return this.afDB.list(`/${this.modelPathUsers}`, { query: {
      orderByChild: 'rol',
      equalTo: "Guide",
      limitToFirst: 100
    }} )
  }

  getAllPlanByCat(attribute){
    console.log("MY ATTRIBUTE " + attribute);

    if (attribute=='popular'){
      return this.getPlanPopular();
    }

    console.log("CONSULTO NORMAL");

    return this.afDB.list(`/${this.modelPath}`, { query: {
      orderByChild: attribute,
      limitToFirst: 100
    }} ) 
  }

  getPlanPopular(){
    //Search is made by revertAverage so it organize max to min average
    return this.afDB.list(`/${this.modelPath}`, { query: {
      orderByChild: 'rate/revertAverageXVotes',
      startAt: !null,
      limitToFirst: 100
    }} )
  }

  getAllPlanByRecurrent(attribute){
    if(attribute != null){
      return this.afDB.list(`/${this.modelPath}`, { query: {
        orderByChild: 'recurrent',
        equalTo: attribute,
        limitToFirst: 100
      }} )
    }else{
      return this.afDB.list(`/${this.modelPath}`);
    }
  }

  merge(object, upload){
    if(upload){
      this.pushUpload(upload, object)
    }else{
      this.afDB.database.ref(`${this.modelPath}/` + object.id).set(object);
    }
  }

  remove(id){
    this.afDB.database.ref(`${this.modelPath}/` + id).remove();
  }

  //------END MODEL------


 //------UPLOAD------
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

      object.image = uploadTask.snapshot.downloadURL;
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