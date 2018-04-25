import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatDatepicker } from "@angular/material";
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AmazingTimePickerModule } from 'amazing-time-picker';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';
import { MdlExpansionPanelModule } from '@angular-mdl/expansion-panel';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { app_routing } from './app.routes';

import { PageTitleService } from './services/page-title.service';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/commons/header/header.component';
import { AsideMenuComponent } from './components/commons/aside-menu/aside-menu.component';
import { DemoComponent } from './components/demo/demo.component';
import { PieComponent } from './components/commons/material-lite/pie/pie.component';
import { GraphComponent } from './components/commons/material-lite/graph/graph.component';
import { ChkboxCardComponent } from './components/commons/material-lite/chkbox-card/chkbox-card.component';
import { SquareCardComponent } from './components/commons/material-lite/square-card/square-card.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { RolComponent } from './components/rol/rol.component';
import { SocialComponent } from './components/social/social.component';
import { PlanAsistentesComponent } from './components/plan-asistentes/plan-asistentes.component';
import { CalificacionPlanUsuarioComponent } from './components/calificacion-plan-usuario/calificacion-plan-usuario.component';
import { TipoActividadSocialComponent } from './components/tipo-actividad-social/tipo-actividad-social.component';
import { LugarPlanesComponent } from './components/lugar-planes/lugar-planes.component';
import { SocialPendingComponent } from './components/social-pending/social-pending.component';
import { ActividadRecurrenteComponent } from './components/actividad-recurrente/actividad-recurrente.component';
import { ContactMessageComponent } from './components/contact-message/contact-message.component';
import { IwanttoteachComponent } from './components/iwanttoteach/iwanttoteach.component';
import { IwanttoteachFormComponent } from './components/iwanttoteach-form/iwanttoteach-form.component';
import { ManageUsersService } from './services/manage-users.service';
import { RolService } from './services/rol.service';
import { SocialService } from './services/social.service';
import { ObjectiveService } from './services/objective.service';

import { TipoActividadSocialService } from './services/tipo-actividad-social-service';
import { LugarPlanesService } from './services/lugar-planes.service';
import { ContactMessageService } from './services/contact-message.service';
import { LoginComponent } from './components/authentication/login/login.component';
import { EmailComponent } from './components/authentication/email/email.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { MembersComponent } from './components/authentication/members/members.component';

import { AuthGuard } from './services/auth.service';
import { ObjectivesComponent } from './components/objectives/objectives.component';

//Test
// export const firebaseConfig = {
//   apiKey: "AIzaSyCW1ZSceJZ6DYFxHpYEaXcwofW7jQhI0WE",
//   authDomain: "joinuptest-495af.firebaseapp.com",
//   databaseURL: "https://joinuptest-495af.firebaseio.com",
//   storageBucket: "joinuptest-495af.appspot.com",
//   messagingSenderId: '930553757475'
// };

//Prod
export const firebaseConfig = {
  apiKey: "AIzaSyDOE-zGBdOqDX363HUd_7lUMAo-TQ-wO9M",
  authDomain: "joinup-prod.firebaseapp.com",
  databaseURL: "https://joinup-prod.firebaseio.com",
  projectId: "joinup-prod",
  storageBucket: "joinup-prod.appspot.com",
  messagingSenderId: "1001729495066"
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideMenuComponent,
    DemoComponent,
    PieComponent,
    GraphComponent,
    ChkboxCardComponent,
    SquareCardComponent,
    ManageUsersComponent,
    RolComponent,
    SocialComponent,
    PlanAsistentesComponent,
    CalificacionPlanUsuarioComponent,
    TipoActividadSocialComponent,
    LugarPlanesComponent,
    SocialPendingComponent,
    ActividadRecurrenteComponent,
    ContactMessageComponent,
    IwanttoteachComponent,
    IwanttoteachFormComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent,
    ObjectivesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MdlModule,
    MdlSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgDatepickerModule,
    MdlExpansionPanelModule,
    app_routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatCommonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AmazingTimePickerModule,
    BrowserAnimationsModule
  ],
  providers: [
    PageTitleService,
    ManageUsersService,
    RolService,
    SocialService,
    TipoActividadSocialService,
    LugarPlanesService,
    ContactMessageService,
    ObjectiveService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
