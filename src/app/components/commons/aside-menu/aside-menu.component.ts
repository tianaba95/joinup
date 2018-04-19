import { Component, OnInit } from '@angular/core';
import { MdlLayoutComponent } from '@angular-mdl/core';
import {AngularFireAuth  } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

declare var $:any;

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.css']
})
export class AsideMenuComponent implements OnInit {

  username = "";
  username_img = "";

  displaySubmenu = null;

  menu_list = [
    {id:1,text:'Users',icon:'report', children:[
      {text:'Manage Users', link: 'users'},{text:'Manage Roles', link: 'rol'},{text:'Manage Goals', link: 'goals'}
    ]},
    {id:2,text:'Social',icon:'report', children:[
      {text:'Plans', link: 'social'},
      {text:'Plans Assistants', link: 'plan_asistentes'},
      {text:'Plans Rate', link: 'calificacion_plan_usuario'},
      {text:'Plans Types', link: 'tipo_actividad_social'},
      {text:'Plans Places', link: 'lugar_planes'},
      {text:'Plans Pending Approve', link: 'social_pending'},
      {text:'Plans Recurrent', link: 'actividad_recurrente'}
    ]},
    {id:3,text:'Contact Message',icon:'report', link: 'contact_message'},
    {id:4,text:'I want to teach',icon:'report', children:[
      {text:'Applications', link: 'iwanttoteach'},
      {text:'Form', link: 'iwanttoteach_form'}
    ]},
    {id:5,text:'Demo',icon:'report', link: 'demo'}
    //{text:'Manage Users', link: 'users', icon: 'report'},
    //{id:2,text:'Manage Roles', link: 'rol', icon: 'report'},
    //{id:3,text:'Social Plans', link: 'social', icon: 'report'},
    //{id:4,text:'Social Plans Assistants', link: 'plan_asistentes', icon: 'report'},
    //{id:5,text:'Social Plans Rate', link: 'calificacion_plan_usuario', icon: 'report'},
    //{id:6,text:'Social Plans Types', link: 'tipo_actividad_social', icon: 'report'},
    //{id:7,text:'Social Plans Places', link: 'lugar_planes', icon: 'report'},
    //{id:8,text:'Social Plans Pending Approve', link: 'social_pending', icon: 'report'},
    //{id:9,text:'Social Plans Recurrent', link: 'actividad_recurrente', icon: 'report'},
    //{id:10,text:'Contact Message', link: 'contact_message', icon: 'report'},
    //{id:11,text:'I want to teach Applications', link: 'iwanttoteach', icon: 'report'},
    //{id:12,text:'I want to teach Form', link: 'iwanttoteach_form', icon: 'report'},
    //{id:13,text:'Demo', link: 'demo', icon: 'report'},
  ];

  constructor(private mdlLayoutComponent:MdlLayoutComponent, public afAuth: AngularFireAuth) {
      var user = this.afAuth.auth.currentUser;
      if (user){
        this.username = user.displayName;
        if(user.photoURL){
          this.username_img = user.photoURL;}
      }
   }

  ngOnInit() {
  }

  closeMenu(){
    if(this.mdlLayoutComponent.isDrawerVisible){
      this.mdlLayoutComponent.toggleDrawer();
    }
  }

  dropdownMenu(id){

    this.displaySubmenu =  $( "#dropdown-" + id + " .dropdown-content" );
    var _this = this;
   
    //Only if child exist (has submenu)
    if(this.displaySubmenu[0]){
      $( "#dropdown-" + id ).toggleClass( "background-none" )
    }

    this.displaySubmenu.slideToggle( function(){
      //_this.displaySubmenu.toggleClass("display-block")
    } );
    
  }

}

