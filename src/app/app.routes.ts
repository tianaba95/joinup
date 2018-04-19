import { RouterModule, Routes } from '@angular/router';

import { DemoComponent } from './components/demo/demo.component';
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

import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { EmailComponent } from './components/authentication/email/email.component';
import { MembersComponent } from './components/authentication/members/members.component';
import { ObjectivesComponent } from './components/objectives/objectives.component';

import { AuthGuard } from './services/auth.service';

const app_routes: Routes = [
    { path: 'demo', component: DemoComponent, canActivate: [AuthGuard] },
    { path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard] },
    { path: 'rol', component: RolComponent },
    { path: 'goals', component: ObjectivesComponent },
    { path: 'social', component: SocialComponent },
    { path: 'plan_asistentes', component: PlanAsistentesComponent },
    { path: 'calificacion_plan_usuario', component: CalificacionPlanUsuarioComponent },
    { path: 'tipo_actividad_social', component: TipoActividadSocialComponent },
    { path: 'lugar_planes', component: LugarPlanesComponent },
    { path: 'social_pending', component: SocialPendingComponent },
    { path: 'actividad_recurrente', component: ActividadRecurrenteComponent },
    { path: 'contact_message', component: ContactMessageComponent },
    { path: 'iwanttoteach', component: IwanttoteachComponent },
    { path: 'iwanttoteach_form', component: IwanttoteachFormComponent },

    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },

    { path: '**', pathMatch: 'full', redirectTo: 'demo' },
];

export const app_routing = RouterModule.forRoot(app_routes);