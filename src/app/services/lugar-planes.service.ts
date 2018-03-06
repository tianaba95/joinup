import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';



@Injectable()
export class LugarPlanesService {
  constructor(public afDB:AngularFireDatabase) { }
  
  private modelPath:string = 'lugar_planes';

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

}