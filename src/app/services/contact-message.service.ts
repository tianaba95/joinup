import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactMessageService {
  constructor(public afDB:AngularFireDatabase) {
    //this.getTest();
   }
  
  private modelPath:string = 'contact_message';
  private modelPathUser:string = 'users';

  public userList:Observable<any>=null;
  public observable:FirebaseObjectObservable<any>;


  //------MODEL------
  getAll(){
    return this.afDB.list(`/${this.modelPath}`);
  }

  merge(object){
    this.afDB.database.ref(`${this.modelPath}/` + object.id).set(object);
  }

  remove(id){
    this.afDB.database.ref(`${this.modelPath}/` + id).remove();
  }

  getUserById(id){
    var ref = this.afDB.database.ref(`${this.modelPathUser}/` + id);
    // Attach an asynchronous callback to read the data at our posts reference
    ref.once("value")
      .then(function(snapshot) {
        console.log(snapshot.val())
        this.userList = snapshot.val() as Observable<any>;
      });
  }

  getTest(){
    console.log("IN")
  var ref = this.afDB.object(`${this.modelPathUser}/` + '1509940779971');
  console.log("OKOKOKOK")
    ref.map(function (key) {
      console.log("OK")
      console.log(`${key.$value}`);
    });
  }

  gotData(data) {
    var fruit = data.val();
    console.log(fruit)
    this.observable = fruit as FirebaseObjectObservable<any>;
    
  }

  errData(data) {
    console.log("ERR")
  }



}