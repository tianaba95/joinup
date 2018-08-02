import { Component, OnInit } from '@angular/core';
import { MdlLayoutComponent } from '@angular-mdl/core';
import {AngularFireAuth  } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { PageTitleService } from '../../../services/page-title.service';

declare var $:any;

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.css']
})
export class AsideMenuComponent implements OnInit {

  username = "";
  username_img = "";
  is404:any;

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
      {text:'Applications', link: 'iwanttoteach'}
    ]},
    {id:5,text:'Demo',icon:'report', link: 'demo'}
  ];

  constructor(private mdlLayoutComponent:MdlLayoutComponent, public afAuth: AngularFireAuth, public pagetitleService: PageTitleService) {
    this.is404 = this.pagetitleService.is404;
    console.log(this.pagetitleService.isPage404());
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

